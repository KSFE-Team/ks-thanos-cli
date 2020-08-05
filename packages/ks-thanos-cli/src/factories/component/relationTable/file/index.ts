import { Import } from './types';
import Debug from 'Src/utils/debugger';
import { upperFirst, lowerFirst } from 'Src/utils/string';
import { Component, ComponentConfig } from '../../../component/basic';
import { ConnectDecorator } from '../../../decorator/connect';
import { FormDecorator } from '../../../decorator/form';
import { getImportsCode } from 'Src/utils/getCode';
import { ComponentManager } from './manager';
import { Value } from 'Src/factories/value';
import { BasicContainer } from 'Src/factories/basicElement';
import { VariableDeclaration, VariableFromState } from 'Src/factories/page/types';

const debug = Debug(__filename);

export default class File extends BasicContainer {

    pageName: string = ''; // 页面名称
    pageChineseName: string = ''; // 页面中文名称
    className: string = ''; // 页面类名称
    paramKey: string = ''; // 页面路由参数
    pagePath: string = ''; // 页面路径
    // model: Model; // 页面关联的model
    connectDecorator: any;
    decorators: any[] = [];
    methods: any[] = [];
    didMountStep: any[] = [];
    components: any[] = [];
    model: any;
    filePage: any;
    pageTitleCode: any = '';
    isUseCard: boolean;
    pageComponents: any[];

    propTypesCode: any[] = [
        'match: PropTypes.object'
    ]; // 默认的参数类型定义

    renderVariableDeclaration: VariableDeclaration[] = []; // render前定义的变量
    stateVariableDeclaration: VariableFromState[] = []; // state中的定义变量
    /**
     * 构造函数
     * @param name 页面名
     * @param components 页面中的配置
     */
    constructor({
        name,
        chineseName,
        components = [],
        paramKey = '',
        pagePath = '',
        filePage,
        pageComponents
    }: {
        name: string;
        chineseName: string;
        components: ComponentConfig[];
        paramKey: string;
        pagePath: string;
        filePage: any;
        pageComponents: ComponentConfig[];
    }) {
        super();
        this.pageName = lowerFirst(name);
        this.pageChineseName = chineseName;
        this.className = upperFirst(name);
        this.paramKey = paramKey;
        this.pagePath = pagePath;
        this.filePage = filePage;
        this.isUseCard = true;
        this.pageComponents = pageComponents;

        this.connectDecorator = new ConnectDecorator({
            name: 'connect',
            pageName: this.pageName,
            inputProps: [
                this.pageName,
            ],
            outputProps: [
                new Value({
                    key: this.pageName,
                    value: this.pageName,
                    type: 'object'
                })
            ]
        });
        this.model = this.filePage.model;
        this.decorators.push(this.connectDecorator);
        this.init(components);
    }

    /**
     * 页面初始化
     * @param config 页面配置
     */
    init(config: ComponentConfig[] = []) {
        config.forEach((componentConfig) => {
            debug(`add component: ${JSON.stringify(componentConfig)}`);
            ComponentManager.add(this, componentConfig);
        });
    }

    /**
     * 添加 decorator
     * @param decorator decorator对象
     */
    addDecorator(decorator: ConnectDecorator | FormDecorator) {
        this.decorators.push(decorator);
    }

    /**
     * 添加组件
     * @param component 组件对象
     */
    addComponent(component: Component) {
        this.components.push(component);
    }

    /**
     * 添加方法
     * @param methodCode 方法代码
     */
    addMethod(methodCode: string) {
        this.methods.push(methodCode);
    }

    /**
     * 添加 componentDidMount 步骤
     * @param stepCode 步骤代码
     */
    addDidMountStep(stepCode: string) {
        this.didMountStep.push(stepCode);
    }

    updateConnectDecorator(inputProps: string[], outputProps: Value[]) {
        this.connectDecorator.updateInputProps(inputProps);
        this.connectDecorator.updateOutputProps(outputProps);
    }

    replaceConnectDecorator(inputProps: string[], outputProps: Value[]) {
        this.connectDecorator.replaceInputProps(inputProps);
        this.connectDecorator.replaceOutputProps(outputProps);
    }

    initPageTitleCode(code: string) {
        this.pageTitleCode = code;
    }

    updatePropTypesCode = (code: string) => {
        this.propTypesCode.push(code);
    }

    getPropTypesCode() {
        const decoratorPropTypesCode = this.decorators
            .map((item) => item.getOutputPropTypesCode())
            .filter((code) => code);

        return [
            ...decoratorPropTypesCode,
            ...this.propTypesCode
        ].join(',\n');
    }

    /* 页面card配置 */
    getPageCard = (codes: string) => {
        return codes;
    }

    addStateVariableDeclaration = () => {}

    addRenderVariableDeclaration = () => {}

    /**
     * 获取 import
     * @returns 需要import的模块
     */
    getImports() {
        let imports: Import[] = [
            {
                name: 'React',
                source: 'react',
                defaultImport: true
            },
            {
                name: 'Fragment',
                source: 'react',
                defaultImport: false
            },
            {
                name: 'PropTypes',
                source: 'prop-types',
                defaultImport: true
            }
        ];
        this.components.forEach((component) => {
            imports = imports.concat(component.getImports());
        });
        this.decorators.forEach((decorator) => {
            imports = imports.concat(decorator.getImports());
        });
        return imports;
    }

    /**
     * 生成代码
     * @returns 代码
     */
    toCode() {
        const importsCode = getImportsCode(this.getImports());
        const componentsCode = this.components.map((item) => item.toCode()).join('\n');
        const decoratorCode = this.decorators.filter((item) => !(item instanceof ConnectDecorator)).map((item) => item.toCode()).join('\n');
        const connectDecoratorCode = this.connectDecorator.toCode();
        const methodsCode = this.methods.join('\n');
        const didMountStepCode = this.didMountStep.join('\n');
        const propTypesCode = this.getPropTypesCode();

        return `
${importsCode}

${connectDecoratorCode}
${decoratorCode}
export default class ${this.className} extends React.Component {

    static propTypes = {
        ${propTypesCode}
    }
    ${methodsCode}
    componentDidMount() {
        ${didMountStepCode}
    }

    render() {
        return (
            <Fragment>
                ${componentsCode}
            </Fragment>
        );
    }
}
`;
    }
}
