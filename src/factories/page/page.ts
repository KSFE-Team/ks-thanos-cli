import { ConnectDecorator, Import, ComponentStateProps, BasciImport } from './types';
import Debug from '../../utils/debugger';
import { upperFirst } from '../../utils/upperFirst';
import { ComponentStructure, BasicComponent, Basic } from '../component/basicComponent';
import { getImportsCode, getDecoratorsCode, getComponentsCode, getStateCode, addComponent } from './utils';

const debug = Debug(__filename);

export class Page extends Basic {

    public name: string = '';
    public pageName: string = '';
    public className: string = '';

    private imports: Import = {
        'react': [{
            name: 'React',
            defaultImport: true
        }],
        'kredux': [{
            name: 'connect',
            defaultImport: false
        }]
    };
    private decorators: ConnectDecorator[] = [];
    private components: BasicComponent[] = [];
    private stateProps: ComponentStateProps[] = [];

    constructor(name: string) {
        super();
        this.name = name;
        this.className = upperFirst(name);
    }

    public addImport(basicImport: BasciImport) {
        const { source } = basicImport;
        const existedImport = this.imports[source];
        const importModule = {
            name: basicImport.name,
            defaultImport: basicImport.defaultImport
        };
        if (existedImport) {
            existedImport.push(importModule);
        } else {
            this.imports[source] = [importModule];
        }
    }

    public getImports() {
        return this.imports;
    }

    public addDecorator(decorator: ConnectDecorator) {
        this.decorators.push(decorator);
    }

    public getDecorators() {
        return this.decorators;
    }

    public addComponent(component: BasicComponent) {
        const imports = component.getImports();
        imports.forEach((importItem) => {
            this.addImport(importItem);
            debug(`currentPage imports: ${JSON.stringify(this.getImports())}`);
        });
        this.components.push(component);
    }

    public addComponents(components: ComponentStructure[] = []) {
        components.forEach((component) => {
            debug(`add component: ${JSON.stringify(component)}`);
            addComponent(this, component);

            if (component.name === 'KSTable') {
                const decorator: ConnectDecorator = {
                    name: 'connect',
                    inputProps: [
                        this.name,
                        `${this.name}ListLoading`
                    ]
                };
                debug(`add decorators: ${JSON.stringify(decorator)}`);
                this.addDecorator(decorator);
            }
        });
    }

    public getComponents() {
        return this.components;
    }

    public addState(stateProps: ComponentStateProps[]) {
        this.stateProps = this.stateProps.concat(stateProps);
    }

    public getState() {
        return this.stateProps;
    }

    public toCode() {
        const imports = this.getImports();
        const importsCode = getImportsCode(imports);

        const decorators = this.getDecorators();
        const decoratorCode = getDecoratorsCode(this.name + 'Form', this.name, decorators);

        const components = this.getComponents();
        const componentsCode = getComponentsCode(components);

        const stateProps = this.getState();
        const statePropsCode = getStateCode(stateProps);

        return `
${importsCode}

${decoratorCode}
export default class ${this.className} extends React.Component {

    state = {
        ${statePropsCode}
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
