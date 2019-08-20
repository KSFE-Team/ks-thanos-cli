"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../../action/action");
const baseElement_1 = require("Src/factories/baseElement");
class TableColumn extends baseElement_1.BaseElement {
    constructor(page, config) {
        super();
        this.actions = [];
        const { actions, ...other } = config;
        this.config = other;
        if (actions) {
            actions.forEach((action) => {
                const actionInstance = new action_1.Action(page, action);
                this.actions.push(actionInstance);
            });
        }
    }
    getImports() {
        let imports = [];
        this.actions.forEach((action) => {
            imports = imports.concat(action.getImports());
        });
        return imports;
    }
    toCode() {
        let codes = [];
        Object.entries(this.config).forEach((keyValue) => {
            const [key, value] = keyValue;
            codes.push(`${key}: '${value}'`);
        });
        if (this.actions.length) {
            const actionCodes = this.actions.map((action) => action.toCode());
            codes.push(`render: (text) => {
                return (
                    <div>
                        ${actionCodes}
                    </div>
                );
            }`);
        }
        return `{
            ${codes.join(',\n')}
        }`;
    }
}
exports.TableColumn = TableColumn;
//# sourceMappingURL=tableColumn.js.map