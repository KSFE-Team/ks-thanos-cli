"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugger_1 = __importDefault(require("../../utils/debugger"));
const tableComponent_1 = require("../component/tableComponent");
const component_1 = require("../../utils/constants/component");
const formComponent_1 = require("../component/formComponent");
const formItem_1 = require("../component/formComponent/formItem");
const debug = debugger_1.default(__filename);
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
function addComponent(page, instance, component, handler) {
    let componentInstance;
    switch (component.componentName) {
        case component_1.COMPONENT_TYPES.TABLE:
            componentInstance = new tableComponent_1.TableComponent(page, component);
            instance.addComponent(componentInstance);
            break;
        case component_1.COMPONENT_TYPES.FORM:
            componentInstance = new formComponent_1.FormComponent(page, component);
            instance.addComponent(componentInstance);
            break;
        case component_1.COMPONENT_TYPES.INPUT:
            componentInstance = new formItem_1.FormItem(page, component);
            instance.addComponent(componentInstance);
    }
    if (componentInstance) {
        handler && handler(component, componentInstance);
        if (component.components) {
            component.components.forEach((component) => {
                addComponent(page, componentInstance, component, handler);
            });
        }
        componentInstance.init();
    }
}
exports.addComponent = addComponent;
//# sourceMappingURL=utils.js.map