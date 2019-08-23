"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../factories/page/index"));
const component_1 = require("./constants/component");
function addComponent(target, config) {
    let page, componentInstance;
    if (target instanceof index_1.default) {
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
                addComponent(componentInstance, itemConfig);
            });
        }
        componentInstance.init();
    }
}
exports.addComponent = addComponent;
//# sourceMappingURL=addComponent.js.map