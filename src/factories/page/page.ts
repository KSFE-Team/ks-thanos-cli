import { ConnectDecorator, Import, FormDecorator, ComponentStateProps, BasciImport } from './types';
import Debug from '../../utils/debugger';
import { ComponentInjection } from '../component/component';
import { upperFirst } from '../../utils/upperFirst';

const debug = Debug(__filename);

function getDecoratorsCode(formName: string, pageName: string, decorators: (ConnectDecorator | FormDecorator)[]) {
    return decorators.map((decorator) => {
        switch (decorator.name) {
            case 'connect':
                const { inputProps } = decorator;
                const inputPropsCode = inputProps.join(', ');
                return `@connect(({ ${inputPropsCode} }) => ({ ${inputPropsCode} }))`;
            case 'Form.create':
                const { formItems = [] } = decorator;
                if (formItems.length) {
                    let mapPropsToFieldsCode = '';
                    mapPropsToFieldsCode = formItems.map((formItem) => {
                        return `${formItem}: Form.createFormField({
                            ...props.${pageName}.${formName}.${formItem},
                            value: props.${pageName}.${formName}.${formItem} && props.${pageName}.${formName}.${formItem}.value
                        }),`;
                    }).join('\n');
                    return `@Form.create({
                        mapPropsToFields() {
                            return {
                                ${mapPropsToFieldsCode}
                            };
                        },
                        onFieldsChange(props, fields) {
                            actions.${pageName}.setReducers({
                                ${formName}: {
                                    ...props.${pageName}.${formName},
                                    ...fields
                                }
                            });
                        }
                    })`;
                }
                return `@Form.create()`;
        }
    }).join('\n');
}

function getImportsCode(imports: Import) {
    const codes: string[] = [];
    for (let source in imports) {
        const modules = imports[source];
        const defaultImportModules = modules.filter(({ defaultImport }) => defaultImport).map(({ name }) => name);
        const importModules = modules.filter(({ defaultImport }) => !defaultImport).map(({ name }) => name);
        const defaultImportModulesCode = defaultImportModules.join();
        const importModulesCode = importModules.join(', ');
        debug(`defaultImportModules code: ${defaultImportModulesCode}`);
        debug(`importModules code: ${importModulesCode}`);
        codes.push(`import ${defaultImportModulesCode}${defaultImportModules.length && importModules.length ? ', ' : ''}${importModules.length ? `{ ${importModulesCode} }` : ''} from '${source}'`);
    }
    debug(`Import Code: ${codes}`);
    return codes.join('\n');
}

function getComponentsCode(components: ComponentInjection[]) {
    return components.map((component) => {
        return component.toCode();
    }).join('\n');
}

function getStateCode(stateProps: ComponentStateProps[]) {
    return stateProps.map(({ name, value }) => {
        const valueStr = JSON.stringify(value);
        debug(`state ${name}: ${valueStr}`);
        return `${name}: ${valueStr}`;
    }).join('\n');
}

export class Page {

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
    private components: ComponentInjection[] = [];
    private stateProps: ComponentStateProps[] = [];

    constructor(name: string) {
        this.name = name;
        this.className = upperFirst(name);
    }

    public addImports(basicImport: BasciImport) {
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

    public addDecorators(decorators: ConnectDecorator[] = []) {
        this.decorators = this.decorators.concat(decorators);
    }

    public getDecorators() {
        return this.decorators;
    }

    public addComponents(components: ComponentInjection[] = []) {
        components.forEach((component) => {
            if (component.name === 'KSTable') {
                this.addDecorators([
                    {
                        name: 'connect',
                        inputProps: [
                            this.name,
                            `${this.name}ListLoading`
                        ]
                    }
                ]);
            }
        });
        this.components = this.components.concat(components);
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
