import { Import } from './types';
import Debug from 'Src/utils/debugger';
import { upperFirst, lowerFirst } from 'Src/utils/string';
import { Component, ComponentConfig } from '../component/basic';
import Model from '../model';
import { ConnectDecorator } from '../decorator/connect';
import { FormDecorator } from '../decorator/form';
import { getImportsCode } from 'Src/utils/getImportsCode';
import { BasicContainer } from 'Src/factories/basicElement';
import { ComponentManager } from '../component/manager';

const debug = Debug(__filename);

export default class Page extends BasicContainer {

    public pageName: string = ''; // 页面名称
    public className: string = ''; // 页面类名称

    public model: Model; // 页面关联的model

    private decorators: (ConnectDecorator | FormDecorator)[] = []; // 页面所使用的 decorator
    private components: Component[] = []; // 页面中的子组件
    private methods: string[] = []; // 页面方法
    private didMountStep: string[] = []; // componentDidMount 中的步骤

    /**
     * 构造函数
     * @param name 页面名
     * @param components 页面中的配置
     */
    constructor(name: string, components: ComponentConfig[] = []) {
        super();
        this.pageName = lowerFirst(name);
        this.className = upperFirst(name);

        this.model = new Model({
            initialState: {},
            namespace: this.pageName
        });
        this.init(components);
    }

    /**
     * 页面初始化
     * @param config 页面配置
     */
    public init(config: ComponentConfig[] = []) {
        config.forEach((componentConfig) => {
            debug(`add component: ${JSON.stringify(componentConfig)}`);
            ComponentManager.add(this, componentConfig);
        });
    }

    /**
     * 添加 decorator
     * @param decorator decorator对象
     */
    public addDecorator(decorator: ConnectDecorator | FormDecorator) {
        this.decorators.push(decorator);
    }

    /**
     * 添加组件
     * @param component 组件对象
     */
    public addComponent(component: Component) {
        this.components.push(component);
    }

    /**
     * 添加方法
     * @param methodCode 方法代码
     */
    public addMethod(methodCode: string) {
        this.methods.push(methodCode);
    }

    /**
     * 添加 componentDidMount 步骤
     * @param stepCode 步骤代码
     */
    public addDidMountStep(stepCode: string) {
        this.didMountStep.push(stepCode);
    }

    /**
     * 获取 import
     * @returns 需要import的模块
     */
    getImports() {
        let imports: Import[] = [];
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
    public toCode() {
        const importsCode = getImportsCode(this.getImports());
        const componentsCode = this.components.map((item) => item.toCode()).join('\n');
        const decoratorCode = this.decorators.map((item) => item.toCode()).join('\n');
        const methodsCode = this.methods.join('\n');
        const didMountStepCode = this.didMountStep.join('\n');

        return `
${importsCode}

${decoratorCode}
export default class ${this.className} extends React.Component {
    ${methodsCode}
    componentDidMount() {
        ${didMountStepCode}
    }

    render() {
        return (
            <React.Fragment>
                ${componentsCode}
            </React.Fragment>
        );
    }
}
`;
    }
}
