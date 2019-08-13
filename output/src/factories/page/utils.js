"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugger_1 = __importDefault(require("../../utils/debugger"));
const tableComponent_1 = require("../component/tableComponent");
const component_1 = require("../../utils/constants/component");
const debug = debugger_1.default(__filename);
function getDecoratorsCode(formName, pageName, decorators) {
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
exports.getDecoratorsCode = getDecoratorsCode;
function getImportsCode(imports) {
    const codes = [];
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
exports.getImportsCode = getImportsCode;
function getComponentsCode(components) {
    return components.map((component) => {
        return component.toCode();
    }).join('\n');
}
exports.getComponentsCode = getComponentsCode;
function getStateCode(stateProps) {
    return stateProps.map(({ name, value }) => {
        const valueStr = JSON.stringify(value);
        debug(`state ${name}: ${valueStr}`);
        return `${name}: ${valueStr}`;
    }).join('\n');
}
exports.getStateCode = getStateCode;
function addComponent(page, instance, component, handler) {
    let componentInstance;
    switch (component.name) {
        case component_1.COMPONENT_TYPES.TABLE:
            componentInstance = new tableComponent_1.TableComponent(page, component);
            componentInstance.init();
            instance.addComponent(componentInstance);
            break;
    }
    if (componentInstance) {
        handler && handler(component, componentInstance);
        if (component.components) {
            component.components.forEach((component) => {
                addComponent(page, componentInstance, component, handler);
            });
        }
    }
}
exports.addComponent = addComponent;
//# sourceMappingURL=utils.js.map