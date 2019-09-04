"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __importDefault(require("Src/factories/page"));
const component_1 = require("Src/utils/constants/component");
class ComponentManager {
    static add(target, config) {
        let page, componentInstance;
        if (target instanceof page_1.default) {
            page = target;
        }
        else {
            page = target.page;
        }
        const TargetComponentClass = component_1.COMPONENT_TYPES_MAP[config.componentName];
        if (TargetComponentClass) {
            componentInstance = new TargetComponentClass(page, config);
            target.addComponent(componentInstance);
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