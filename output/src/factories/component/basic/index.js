"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugger_1 = __importDefault(require("Src/utils/debugger"));
const index_1 = require("../../baseElement/index");
const debug = debugger_1.default(__filename);
class Component extends index_1.BaseElement {
    constructor(page, config) {
        super();
        this.componentName = '';
        this.stateName = '';
        this.upperStateName = '';
        this.source = 'antd';
        this.default = false;
        this.components = [];
        this.props = {};
        this.page = page;
        const { componentName, stateName, source, default: defaultImport } = config;
        this.config = config;
        this.componentName = componentName;
        this.stateName = stateName;
        this.source = source;
        this.default = defaultImport;
        debug(`Component Create -> componentName: ${this.componentName}, stateName: ${this.stateName}, source: ${this.source}, default: ${this.default}`);
    }
    init() {
        const { props = {} } = this.config;
        for (let propKey in props) {
            this.addProp(propKey, props[propKey]);
        }
        this.initProps && this.initProps();
        this.initPageState && this.initPageState();
        this.initEffects && this.initEffects();
        this.initPageMethods && this.initPageMethods();
        this.initPageLifecycle && this.initPageLifecycle();
        this.initPageDecorators && this.initPageDecorators();
    }
    addProp(key, value) {
        debug(`add props: ${key}, ${JSON.stringify(value)}`);
        this.props[key] = `${value}`;
    }
    getImports() {
        let componentImports = [{
                source: this.source,
                name: this.componentName,
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
exports.Component = Component;
//# sourceMappingURL=index.js.map