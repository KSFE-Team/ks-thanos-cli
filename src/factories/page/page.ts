import { ConnectDecorator, Import, ComponentStateProps, BasciImport } from './types';
import Debug from '../../utils/debugger';
import { upperFirst, lowerFirst } from '../../utils/upperFirst';
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
        }, {
            name: 'actions',
            defaultImport: false
        }],
        './models': [{
            name: 'STATE',
            defaultImport: false
        }]
    };
    private decorators: ConnectDecorator[] = [];
    private components: BasicComponent[] = [];
    private stateProps: ComponentStateProps[] = [];
    private methods: string[] = [];

    constructor(name: string) {
        super();
        this.name = name;
        this.pageName = lowerFirst(name);
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

    public addDecorator(decorator: ConnectDecorator) {
        this.decorators.push(decorator);
    }

    public addComponent(component: BasicComponent) {
        const imports = component.getImports();
        imports.forEach((importItem) => {
            this.addImport(importItem);
            debug(`currentPage imports: ${JSON.stringify(this.imports)}`);
        });
        this.components.push(component);
    }

    public addComponents(components: ComponentStructure[] = []) {
        components.forEach((component) => {
            debug(`add component: ${JSON.stringify(component)}`);
            addComponent(this, component, (newComponent, newComponentInstance) => {
                if (newComponent.name === 'KSTable') {
                    const decorator: ConnectDecorator = {
                        name: 'connect',
                        inputProps: [
                            this.name,
                            `${this.name}ListLoading`
                        ]
                    };
                    debug(`add decorators: ${JSON.stringify(decorator)}`);
                    this.addDecorator(decorator);
                    newComponentInstance.addProp('dataSource', `this.props.${this.pageName}.${this.pageName}List`);
                    newComponentInstance.addProp('loading', `this.props.${this.pageName}.${this.pageName}ListLoading`);
                    newComponentInstance.addProp('pagination', `{
                        current: this.props.${this.pageName}.search${this.className}Form.page,
                        pageSize: this.props.${this.pageName}.search${this.className}Form.limit,
                        total: this.props.${this.pageName}.search${this.className}Form.total,
                        onChange: this.onPageChange
                    }`);
                    this.addMethod(`
                        loadList() {
                            actions.${this.pageName}.load${this.className}List();
                        }
                    `);
                    this.addMethod(`
                        onPageChange(page, pageSize) {
                            actions.${this.pageName}.setReducers({
                                search${this.className}Form: {
                                    ...this.props.${this.pageName}.search${this.className}Form,
                                    page,
                                    limit: pageSize
                                }
                            });
                            this.load${this.className}List();
                        }
                    `);
                }
            });
        });
    }

    public addState(stateProps: ComponentStateProps[]) {
        this.stateProps = this.stateProps.concat(stateProps);
    }

    public addMethod(methodCode: string) {
        this.methods.push(methodCode);
    }

    public toCode() {
        const importsCode = getImportsCode(this.imports);
        const decoratorCode = getDecoratorsCode(this.name + 'Form', this.name, this.decorators);
        const componentsCode = getComponentsCode(this.components);
        const statePropsCode = getStateCode(this.stateProps);
        const methodsCode = this.methods.join('\n');

        return `
${importsCode}

${decoratorCode}
export default class ${this.className} extends React.Component {

    state = {
        ${statePropsCode}
    }
    ${methodsCode}
    componentDidMount() {
        // 初始化redux
        actions.${this.pageName}.setReducer({
            ...STATE
        });
        this.load${this.className}List();
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
