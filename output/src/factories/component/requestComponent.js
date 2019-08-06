"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basicComponent_1 = require("./basicComponent");
class RequestComponent extends basicComponent_1.BasicComponent {
    constructor(config) {
        super(config);
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