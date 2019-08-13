import { ConnectDecorator, FormDecorator, Import, ComponentStateProps } from './types';
import { ComponentStructure, Basic, TableComponentStructure } from '../component/types';
import Debug from '../../utils/debugger';
import { TableComponent } from '../component/tableComponent';
import { BasicComponent } from '../component/basicComponent';
import { COMPONENT_TYPES } from '../../utils/constants/component';
import Page from './page';

const debug = Debug(__filename);

export function getDecoratorsCode(formName: string, pageName: string, decorators: (ConnectDecorator | FormDecorator)[]) {
    debug(`decorators: ${JSON.stringify(decorators)}`);
    return decorators.map((decorator) => {
        switch (decorator.name) {
            case 'connect':
                const { inputProps, outputProps } = decorator;
                const inputPropsCode = inputProps.join(', ');
                const outputPropsCode = outputProps.join(',\n');
                return `@connect(({ ${inputPropsCode} }) => ({ 
                    ${outputPropsCode}
                 }))`;
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

export function getImportsCode(imports: Import) {
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

export function getComponentsCode(components: BasicComponent[]) {
    return components.map((component) => {
        return component.toCode();
    }).join('\n');
}

export function getStateCode(stateProps: ComponentStateProps[]) {
    return stateProps.map(({ name, value }) => {
        const valueStr = JSON.stringify(value);
        debug(`state ${name}: ${valueStr}`);
        return `${name}: ${valueStr}`;
    }).join('\n');
}

export function addComponent(
    page: Page,
    instance: Basic,
    component: ComponentStructure,
    handler?: (component: ComponentStructure, componentInstance: BasicComponent) => void
) {
    let componentInstance: BasicComponent | undefined;
    switch (component.name) {
        case COMPONENT_TYPES.TABLE:
            componentInstance = new TableComponent(page, component as TableComponentStructure);
            componentInstance.init();
            instance.addComponent(componentInstance);
            break;
    }
    if (componentInstance) {
        handler && handler(component, componentInstance);
        if (component.components) {
            component.components.forEach((component) => {
                addComponent(page, componentInstance as BasicComponent, component, handler);
            });
        }
    }
}
