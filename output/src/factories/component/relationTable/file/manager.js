"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __importDefault(require("Src/factories/page"));
const _1 = __importDefault(require("."));
const component_1 = require("Src/utils/constants/component");
const components_1 = require("../components");
class ComponentManager {
    static add(target, config) {
        let file, componentInstance;
        if (target instanceof page_1.default || target instanceof _1.default) {
            file = target;
        }
        else {
            file = target.page;
        }
        let TargetComponentClass = components_1.RELATION_TABLE_COMPONENTS[config.componentName] || component_1.COMPONENT_TYPES_MAP[config.componentName];
        if (TargetComponentClass) {
            componentInstance = new TargetComponentClass(file, config);
            if (componentInstance) {
                target.addComponent(componentInstance);
            }
        }
        if (componentInstance) {
            if (config.components) {
                config.components.forEach((itemConfig) => {
                    ComponentManager.add(componentInstance, itemConfig);
                });
            }
            componentInstance.init();
        }
    }
}
exports.ComponentManager = ComponentManager;
//# sourceMappingURL=manager.js.map