import { Import } from './types';
import Debug from 'Src/utils/debugger';
import { upperFirst, lowerFirst } from 'Src/utils/string';
import { Component, ComponentConfig } from '../component/basic';
import Model from '../model';
import { ConnectDecorator } from '../decorator/connect';
import { FormDecorator } from '../decorator/form';
import { addComponent } from 'Src/utils/addComponent';
import { getImportsCode } from 'Src/utils/getImportsCode';
import { BasicContainer } from 'Src/factories/basicElement';

const debug = Debug(__filename);

export default class Page extends BasicContainer {

    public name: string = '';
    public pageName: string = '';
    public className: string = '';

    public model: Model;

    private decorators: (ConnectDecorator | FormDecorator)[] = [];
    private components: Component[] = [];
    private methods: string[] = [];
    private didMountStep: string[] = [];

    constructor(name: string, components: ComponentConfig[] = []) {
        super();
        this.name = name;
        this.pageName = lowerFirst(name);
        this.className = upperFirst(name);

        this.model = new Model({
            initialState: {},
            namespace: this.pageName
        });
        this.addComponents(components);
    }

    public addDecorator(decorator: ConnectDecorator | FormDecorator) {
        this.decorators.push(decorator);
    }

    public addComponent(component: Component) {
        this.components.push(component);
    }

    public addComponents(components: ComponentConfig[] = []) {
        components.forEach((component) => {
            debug(`add component: ${JSON.stringify(component)}`);
            addComponent(this, component);
        });
    }

    public addMethod(methodCode: string) {
        this.methods.push(methodCode);
    }

    public addDidMountStep(stepCode: string) {
        this.didMountStep.push(stepCode);
    }

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
