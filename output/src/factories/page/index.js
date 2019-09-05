"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugger_1 = __importDefault(require("Src/utils/debugger"));
const string_1 = require("Src/utils/string");
const model_1 = __importDefault(require("../model"));
const getImportsCode_1 = require("Src/utils/getImportsCode");
const basicElement_1 = require("Src/factories/basicElement");
const manager_1 = require("../component/manager");
const debug = debugger_1.default(__filename);
class Page extends basicElement_1.BasicContainer {
    constructor(name, components = []) {
        super();
        this.pageName = '';
        this.className = '';
        this.decorators = [];
        this.components = [];
        this.methods = [];
        this.didMountStep = [];
        this.pageName = string_1.lowerFirst(name);
        this.className = string_1.upperFirst(name);
        this.model = new model_1.default({
            initialState: {},
            namespace: this.pageName
        });
        this.init(components);
    }
    init(config = []) {
        config.forEach((componentConfig) => {
            debug(`add component: ${JSON.stringify(componentConfig)}`);
            manager_1.ComponentManager.add(this, componentConfig);
        });
    }
    addDecorator(decorator) {
        this.decorators.push(decorator);
    }
    addComponent(component) {
        this.components.push(component);
    }
    addMethod(methodCode) {
        this.methods.push(methodCode);
    }
    addDidMountStep(stepCode) {
        this.didMountStep.push(stepCode);
    }
    getImports() {
        let imports = [
            {
                name: 'React',
                source: 'react',
                defaultImport: true
            }
        ];
        this.components.forEach((component) => {
            imports = imports.concat(component.getImports());
        });
        this.decorators.forEach((decorator) => {
            imports = imports.concat(decorator.getImports());
        });
        return imports;
    }
    toCode() {
        const importsCode = getImportsCode_1.getImportsCode(this.getImports());
        const componentsCode = this.components.map((item) => item.toCode()).join('\n');
        const decoratorCode = this.decorators.map((item) => item.toCode()).join('\n');
        const methodsCode = this.methods.join('\n');
        const didMountStepCode = this.didMountStep.join('\n');
        return `
${importsCode}

${decoratorCode}
export default class ${this.className} extends React.Component {
    ${methodsCode}
    componentDidMount() {
        ${didMountStepCode}
    }

    render() {
        return (
            <React.Fragment>
                ${componentsCode}
            </React.Fragment>
        );
    }
}
`;
    }
}
exports.default = Page;
//# sourceMappingURL=index.js.map