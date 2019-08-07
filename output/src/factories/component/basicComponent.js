"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upperFirst_1 = require("../../utils/upperFirst");
const debugger_1 = __importDefault(require("../../utils/debugger"));
const debug = debugger_1.default(__filename);
class Basic {
}
exports.Basic = Basic;
class BasicComponent extends Basic {
    constructor(config) {
        super();
        this.name = '';
        this.source = 'antd';
        this.default = false;
        this.components = [];
        this.props = {};
        this.className = '';
        const { name, source, default: defaultImport } = config;
        this.config = config;
        this.name = name;
        this.className = upperFirst_1.upperFirst(name);
        this.source = source;
        this.default = defaultImport;
    }
    init() {
        const { props = {} } = this.config;
        for (let propKey in props) {
            this.addProp(propKey, props[propKey]);
        }
    }
    addProp(key, value) {
        debug(`add props: ${key}, ${JSON.stringify(value)}`);
        this.props[key] = value;
    }
    getImports() {
        let componentImports = [{
                source: this.source,
                name: this.className,
                defaultImport: this.default
            }];
        for (let component of this.components) {
            componentImports = componentImports.concat(component.getImports());
        }
        return componentImports;
    }
    addComponent(component) {
        this.components.push(component);
    }
}
exports.BasicComponent = BasicComponent;
//# sourceMappingURL=basicComponent.js.map