"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const confirm_1 = require("../component/confirm");
const link_1 = require("../component/link");
const baseElement_1 = require("Src/factories/component/baseElement");
const index_1 = require("../component/request/index");
class Action extends baseElement_1.BaseElement {
    constructor(page, config) {
        super();
        const { title, name, type, trigger } = config;
        this.name = name;
        this.type = type;
        this.trigger = new confirm_1.ConfirmComponent(page, {
            ...trigger,
            buttonText: name,
            title,
            componentName: `${page.pageName}Confrim`
        });
        switch (type) {
            case 'modal':
                break;
            case 'request':
                this.trigger = new index_1.RequestComponent(page, {
                    ...trigger,
                    text: name
                });
                break;
            case 'link':
                this.trigger = new link_1.LinkComponent(page, {
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