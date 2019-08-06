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
                }]
        };
        this.decorators = [];
        this.components = [];
        this.stateProps = [];
        this.name = name;
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
    getImports() {
        return this.imports;
    }
    addDecorator(decorator) {
        this.decorators.push(decorator);
    }
    getDecorators() {
        return this.decorators;
    }
    addComponent(component) {
        const imports = component.getImports();
        imports.forEach((importItem) => {
            this.addImport(importItem);
            debug(`currentPage imports: ${JSON.stringify(this.getImports())}`);
        });
        this.components.push(component);
    }
    addComponents(components = []) {
        components.forEach((component) => {
            debug(`add component: ${JSON.stringify(component)}`);
            utils_1.addComponent(this, component);
            if (component.name === 'KSTable') {
                const decorator = {
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
    getComponents() {
        return this.components;
    }
    addState(stateProps) {
        this.stateProps = this.stateProps.concat(stateProps);
    }
    getState() {
        return this.stateProps;
    }
    toCode() {
        const imports = this.getImports();
        const importsCode = utils_1.getImportsCode(imports);
        const decorators = this.getDecorators();
        const decoratorCode = utils_1.getDecoratorsCode(this.name + 'Form', this.name, decorators);
        const components = this.getComponents();
        const componentsCode = utils_1.getComponentsCode(components);
        const stateProps = this.getState();
        const statePropsCode = utils_1.getStateCode(stateProps);
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