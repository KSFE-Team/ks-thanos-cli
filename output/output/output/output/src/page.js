"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const structure_1 = require("./utils/structure");
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
        const defaultImportModules = modules.filter(({ defaultImport }) => defaultImport);
        const importModules = modules.filter(({ defaultImport }) => !defaultImport);
        codes.push(`import ${defaultImportModules.join()}${defaultImportModules.length ? ', ' : ''} ${importModules.length ? `{ ${importModules.join(', ')} }` : ''} from '${source}'`);
    }
    return codes.join('\n');
}
function getComponentsCode(components) {
    return components.map(({ name, props }) => {
        const propsCode = [];
        for (let propKey in props) {
            const propValue = props[propKey];
            propsCode.push(`${propKey}={${propValue}}`);
        }
        return `<${name} ${propsCode.join(' ')}/>`;
    }).join('\n');
}
class Page extends structure_1.PageStructure {
    toCode() {
        const imports = this.getImports();
        const importsCode = getImportsCode(imports);
        const decorators = this.getDecorators();
        const decoratorCode = getDecoratorsCode(this.name + 'Form', this.pageName, decorators);
        const components = this.getComponents();
        const componentsCode = getComponentsCode(components);
        return `
${importsCode}

${decoratorCode}
export default class ${this.pageClassName} extends React.Component {
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