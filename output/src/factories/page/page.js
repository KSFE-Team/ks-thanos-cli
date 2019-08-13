"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugger_1 = __importDefault(require("../../utils/debugger"));
const upperFirst_1 = require("../../utils/upperFirst");
const utils_1 = require("./utils");
const model_1 = __importDefault(require("../model/model"));
const types_1 = require("../component/types");
const debug = debugger_1.default(__filename);
class Page extends types_1.Basic {
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
        this.didMountStep = [];
        this.name = name;
        this.pageName = upperFirst_1.lowerFirst(name);
        this.className = upperFirst_1.upperFirst(name);
        this.model = new model_1.default({
            initialState: {},
            namespace: this.pageName
        });
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
            utils_1.addComponent(this, this, component);
        });
    }
    addState(stateProps) {
        this.stateProps = this.stateProps.concat(stateProps);
    }
    addMethod(methodCode) {
        this.methods.push(methodCode);
    }
    addDidMountStep(stepCode) {
        this.didMountStep.push(stepCode);
    }
    toCode() {
        const importsCode = utils_1.getImportsCode(this.imports);
        const componentsCode = utils_1.getComponentsCode(this.components);
        const statePropsCode = utils_1.getStateCode(this.stateProps);
        const decoratorCode = this.decorators.map((item) => item.toCode()).join('\n');
        const methodsCode = this.methods.join('\n');
        const didMountStepCode = this.didMountStep.join('\n');
        return `
${importsCode}

${decoratorCode}
export default class ${this.className} extends React.Component {

    state = {
        ${statePropsCode}
    }
    ${methodsCode}
    componentDidMount() {
        ${didMountStepCode}
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
exports.default = Page;
//# sourceMappingURL=page.js.map