"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugger_1 = __importDefault(require("Src/utils/debugger"));
const basicElement_1 = require("Src/factories/basicElement");
const string_1 = require("Src/utils/string");
const debug = debugger_1.default(__filename);
class Component extends basicElement_1.BasicContainer {
    constructor(page, config) {
        super();
        this.componentName = '';
        this.componentType = '';
        this.parentComponentName = '';
        this.stateName = '';
        this.upperStateName = '';
        this.source = 'antd';
        this.default = false;
        this.components = [];
        this.props = {};
        this.page = page;
        const { componentName, stateName = '', source, default: defaultImport, parentComponentName } = config;
        this.config = config;
        this.componentName = componentName;
        this.parentComponentName = parentComponentName;
        this.stateName = stateName;
        this.upperStateName = string_1.upperFirst(stateName);
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
        this.initPageTitle && this.initPageTitle();
    }
    addProp(key, value) {
        debug(`add props: ${key}, ${JSON.stringify(value)}`);
        if (typeof value === 'boolean') {
            this.props[key] = value;
        }
        else {
            this.props[key] = `${value}`;
        }
    }
    getImports() {
        let componentImports = this.source ? [{
                source: this.source,
                name: this.parentComponentName || this.componentName,
                defaultImport: this.default
            }] : [];
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