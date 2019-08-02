"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugger_1 = __importDefault(require("../../utils/debugger"));
const upperFirst_1 = require("../../utils/upperFirst");
const debug = debugger_1.default(__filename);
class ComponentInjection {
    constructor(config) {
        this.name = '';
        this.source = 'antd';
        this.default = false;
        this.components = [];
        this.props = {};
        this.className = '';
        const { name, source, default: defaultImport, components = [], props = {} } = config;
        this.name = name;
        this.className = upperFirst_1.upperFirst(name);
        this.source = source;
        this.default = defaultImport;
        this.components = components;
        this.props = props;
    }
    addProps() {
    }
    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            const propValue = this.props[propKey];
            const propValueStr = JSON.stringify(propValue);
            debug(`Component propKey ———— ${propKey}: ${propValueStr}`);
            propsCode.push(`${propKey}={${propValueStr}}`);
        }
        return `<${this.className} ${propsCode.join(' ')}/>`;
    }
}
exports.ComponentInjection = ComponentInjection;
//# sourceMappingURL=component.js.map