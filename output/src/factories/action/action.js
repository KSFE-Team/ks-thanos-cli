"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const confirmComponent_1 = require("../component/confirmComponent");
const linkComponent_1 = require("../component/linkComponent");
class Action {
    constructor(config) {
        const { name, type, trigger } = config;
        this.name = name;
        this.type = type;
        this.trigger = new confirmComponent_1.ConfirmComponent({
            ...trigger,
            buttonText: name
        });
        switch (type) {
            case 'modal':
                break;
            case 'request':
                break;
            case 'link':
                this.trigger = new linkComponent_1.LinkComponent({
                    ...trigger,
                    text: name
                });
                break;
        }
        this.trigger.init();
    }
    getImports() {
        let componentImports = [];
        if (this.dialog) {
            componentImports = componentImports.concat(this.dialog.getImports());
        }
        componentImports = componentImports.concat(this.trigger.getImports());
        return componentImports;
    }
    toCode() {
        return `<div>
                    <div>
                        ${this.trigger.toCode()}        
                    </div>
                    ${this.dialog ? `<div>
                        ${this.dialog.toCode()}
                    </div>` : ''}
                </div>`;
    }
}
exports.Action = Action;
//# sourceMappingURL=action.js.map