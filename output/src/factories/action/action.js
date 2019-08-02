"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("../component/component");
class Action {
    constructor(config) {
        const { name, type, dialog, trigger } = config;
        this.name = name;
        this.type = type;
        if (dialog) {
            this.dialog = new component_1.ComponentInjection(dialog);
        }
        this.trigger = new component_1.ComponentInjection(trigger);
        switch (type) {
            case 'confirm':
                break;
        }
    }
    toCode() {
        return `
(text) => {
    return (
        <div>
            ${this.trigger.toCode()}
        </div>
    );
}
`;
    }
}
exports.Action = Action;
//# sourceMappingURL=action.js.map