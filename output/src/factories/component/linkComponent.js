"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basicComponent_1 = require("./basicComponent");
class LinkComponent extends basicComponent_1.BasicComponent {
    constructor(page, config) {
        super(page, config);
        this.href = '';
        this.text = '';
        this.href = config.href;
        this.text = config.text;
    }
    toCode() {
        return `<a href="${this.href}">${this.text}</a>`;
    }
}
exports.LinkComponent = LinkComponent;
//# sourceMappingURL=linkComponent.js.map