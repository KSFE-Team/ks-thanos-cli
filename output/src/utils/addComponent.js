"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./constants/component");
const table_1 = require("../factories/component/table");
const form_1 = require("../factories/component/form");
const input_1 = require("../factories/component/input");
function addComponent(page, instance, component) {
    let componentInstance;
    switch (component.componentName) {
        case component_1.COMPONENT_TYPES.TABLE:
            componentInstance = new table_1.Table(page, component);
            instance.addComponent(componentInstance);
            break;
        case component_1.COMPONENT_TYPES.FORM:
            componentInstance = new form_1.Form(page, component);
            instance.addComponent(componentInstance);
            break;
        case component_1.COMPONENT_TYPES.INPUT:
            componentInstance = new input_1.Input(page, component);
            instance.addComponent(componentInstance);
    }
    if (componentInstance) {
        if (component.components) {
            component.components.forEach((component) => {
                addComponent(page, componentInstance, component);
            });
        }
        componentInstance.init();
    }
}
exports.addComponent = addComponent;
//# sourceMappingURL=addComponent.js.map