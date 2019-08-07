"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugger_1 = __importDefault(require("../../utils/debugger"));
const upperFirst_1 = require("../../utils/upperFirst");
const basicComponent_1 = require("../component/basicComponent");
const utils_1 = require("./utils");
const debug = debugger_1.default(__filename);
class Page extends basicComponent_1.Basic {
    constructor(name) {
        super();
        this.name = '';
        this.pageName = '';
        this.className = '';
        this.imports = {
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
        this.decorators = [];
        this.components = [];
        this.stateProps = [];
        this.methods = [];
        this.name = name;
        this.pageName = upperFirst_1.lowerFirst(name);
        this.className = upperFirst_1.upperFirst(name);
    }
    addImport(basicImport) {
        const { source } = basicImport;
        const existedImport = this.imports[source];
        const importModule = {
            name: basicImport.name,
            defaultImport: basicImport.defaultImport
        };
        if (existedImport) {
            existedImport.push(importModule);
        }
        else {
            this.imports[source] = [importModule];
        }
    }
    addDecorator(decorator) {
        this.decorators.push(decorator);
    }
    addComponent(component) {
        const imports = component.getImports();
        imports.forEach((importItem) => {
            this.addImport(importItem);
            debug(`currentPage imports: ${JSON.stringify(this.imports)}`);
        });
        this.components.push(component);
    }
    addComponents(components = []) {
        components.forEach((component) => {
            debug(`add component: ${JSON.stringify(component)}`);
            utils_1.addComponent(this, component, (newComponent, newComponentInstance) => {
                if (newComponent.name === 'KSTable') {
                    const decorator = {
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
    addState(stateProps) {
        this.stateProps = this.stateProps.concat(stateProps);
    }
    addMethod(methodCode) {
        this.methods.push(methodCode);
    }
    toCode() {
        const importsCode = utils_1.getImportsCode(this.imports);
        const decoratorCode = utils_1.getDecoratorsCode(this.name + 'Form', this.name, this.decorators);
        const componentsCode = utils_1.getComponentsCode(this.components);
        const statePropsCode = utils_1.getStateCode(this.stateProps);
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
exports.Page = Page;
//# sourceMappingURL=page.js.map