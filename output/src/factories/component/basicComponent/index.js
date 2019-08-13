"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upperFirst_1 = require("../../../utils/upperFirst");
const debugger_1 = __importDefault(require("../../../utils/debugger"));
const types_1 = require("../types");
const debug = debugger_1.default(__filename);
class BasicComponent extends types_1.Basic {
    constructor(page, config) {
        super();
        this.name = '';
        this.componentName = '';
        this.componentUpperName = '';
        this.source = 'antd';
        this.default = false;
        this.components = [];
        this.props = {};
        this.className = '';
        this.page = page;
        const { name, componentName, source, default: defaultImport } = config;
        this.config = config;
        this.name = name;
        this.className = upperFirst_1.upperFirst(name);
        this.componentName = componentName;
        this.componentUpperName = upperFirst_1.upperFirst(componentName);
        this.source = source;
        this.default = defaultImport;
        debug(`Component Create -> name: ${this.name}, className: ${this.className}, componentName: ${this.componentName}, componentUpperName: ${this.componentUpperName}, source: ${this.source}, default: ${this.default}`);
    }
    init() {
        const { props = {} } = this.config;
        for (let propKey in props) {
            this.addProp(propKey, props[propKey]);
        }
        this.initProps && this.initProps();
        this.initEffects && this.initEffects();
        this.initPageMethods && this.initPageMethods();
        this.initPageLifecycle && this.initPageLifecycle();
        this.initPageDecorators && this.initPageDecorators();
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
//# sourceMappingURL=index.js.map