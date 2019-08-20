"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("./basic");
class RequestComponent extends basic_1.Component {
    constructor(page, config) {
        super(page, config);
        this.api = '';
        this.method = '';
        this.text = '';
        this.api = config.api;
        this.method = config.method || 'get';
        this.text = config.text;
    }
    toCode() {
        return `<Button>${this.text}</Button>`;
    }
}
exports.RequestComponent = RequestComponent;
//# sourceMappingURL=requestComponent.js.map