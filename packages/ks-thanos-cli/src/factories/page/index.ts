import { Import, VariableDeclaration, VariableFromState } from './types';
import Debug from 'Src/utils/debugger';
import { upperFirst, lowerFirst } from 'Src/utils/string';
import { Component, ComponentConfig } from '../component/basic';
import Model from '../model';
import { ConnectDecorator } from '../decorator/connect';
import { FormDecorator } from '../decorator/form';
import { getImportsCode, getRenderVariableDeclarationCode, getStateVariableDeclarationCode } from 'Src/utils/getCode';
import { BasicContainer } from 'Src/factories/basicElement';
import { ComponentManager } from '../component/manager';
import { Value } from 'Src/factories/value';

const debug = Debug(__filename);

export default class Page extends BasicContainer {

    pageName: string = ''; // 页面名称
    pageChineseName: string = ''; // 页面中文名称
    className: string = ''; // 页面类名称
    paramKey: string = ''; // 页面路由参数
    pagePath: string = ''; // 页面路径
    model: Model; // 页面关联的model

    connectDecorator: ConnectDecorator;
    decorators: (ConnectDecorator | FormDecorator)[] = []; // 页面所使用的 decorator
    components: Component[] = []; // 页面中的子组件
    methods: string[] = []; // 页面方法
    didMountStep: string[] = []; // componentDidMount 中的步骤
    pageTitleCode: string = '';
    renderVariableDeclaration: VariableDeclaration[] = []; // render前定义的变量
    stateVariableDeclaration: VariableFromState[] = []; // state中的定义变量
    propTypesCodes: Value[] = []; // 类型声明
    isUseCard: boolean = true; // 是否使用KSWhiteCard
    form: {
        type: 'search' | 'normal' | 'modal';
        stateName: string;
    } = {
        type: 'search',
        stateName: ''
    } // formItem使用的form 公共参数

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
        pagePath = ''
    }: {
        name: string;
        chineseName: string;
        components: ComponentConfig[];
        paramKey: string;
        pagePath: string;
    }) {
        super();
        this.pageName = lowerFirst(name);
        this.pageChineseName = chineseName;
        this.pageTitleCode = `title="${this.pageChineseName}"`;
        this.className = upperFirst(name);
        this.paramKey = paramKey;
        this.pagePath = pagePath;
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
        this.model = new Model({
            initialState: {},
            namespace: this.pageName
        });
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

    /**
     * 增加render时的变量声明
     * @param config VariableDeclaration
     */
    addRenderVariableDeclaration(config: VariableDeclaration) {
        this.renderVariableDeclaration.push(config);
    }

    /**
     * 增加类型声明
     * @param config Value
     */
    addPropTypesCodes(config: Value) {
        this.propTypesCodes.push(config);
    }

    /**
     * 增加初始state的变量声明
     * @param config VariableDeclaration
     */
    addStateVariableDeclaration(config: VariableFromState) {
        this.stateVariableDeclaration.push(config);
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

    getPropTypesCode() {
        const decoratorPropTypesCode = this.decorators
            .map((item) => item.getOutputPropTypesCode())
            .filter((code) => code);
        const propTypesCodes = this.propTypesCodes.map((item) => {
            return `${item.key}: PropTypes.${item.type}`
        }).filter((code) => code);
        return [
            ...decoratorPropTypesCode,
            ...propTypesCodes
        ].join(',\n');
    }

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
                name: 'PropTypes',
                source: 'prop-types',
                defaultImport: true
            }
        ];
        if (this.isUseCard) {
            imports.push({
                source: 'ks-cms-ui',
                name: 'KSWhiteCard',
                defaultImport: false
            });
        }
        this.components.forEach((component) => {
            imports = imports.concat(component.getImports());
        });
        this.decorators.forEach((decorator) => {
            imports = imports.concat(decorator.getImports());
        });
        return imports;
    }

    getPageCard = (codes: string, titleCodes: string) => {
        if (this.isUseCard) {
            return `<KSWhiteCard
                ${titleCodes}
            >
                ${codes}
            </KSWhiteCard>`;
        }
        return codes;
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
        const renderVariableDeclarationCode = getRenderVariableDeclarationCode(this.renderVariableDeclaration);
        const stateVariableDeclarationCode = getStateVariableDeclarationCode(this.stateVariableDeclaration);
        return `
${importsCode}

${connectDecoratorCode}
${decoratorCode}
export default class ${this.className} extends React.Component {

    static propTypes = {
        ${propTypesCode}
    }
    ${stateVariableDeclarationCode}
    ${methodsCode}
    componentDidMount() {
        ${didMountStepCode}
    }

    render() {
        ${renderVariableDeclarationCode}
        return (
            ${this.getPageCard(componentsCode, this.pageTitleCode)}
        );
    }
}
`;
    }
}

export const getPage = () => Page;
