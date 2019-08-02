"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const structure_1 = require("./utils/structure");
const debugger_1 = __importDefault(require("./utils/debugger"));
const debug = debugger_1.default(__filename);
function getDecoratorsCode(formName, pageName, decorators) {
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
function getComponentsCode(components) {
    return components.map((component) => {
        return component.toCode();
    }).join('\n');
}
function getStateCode(stateProps) {
    return stateProps.map(({ name, value }) => {
        const valueStr = JSON.stringify(value);
        debug(`state ${name}: ${valueStr}`);
        return `${name}: ${valueStr}`;
    }).join('\n');
}
class Page extends structure_1.PageStructure {
    toCode() {
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
exports.Page = Page;
//# sourceMappingURL=page.js.map