"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("./basic");
class LinkComponent extends basic_1.Component {
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