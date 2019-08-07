"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basicComponent_1 = require("./basicComponent");
const debugger_1 = __importDefault(require("../../utils/debugger"));
const action_1 = require("../action/action");
const debug = debugger_1.default(__filename);
class TableColumn {
    constructor(config) {
        this.actions = [];
        const { actions, ...other } = config;
        this.config = other;
        if (actions) {
            actions.forEach((action) => {
                const actionInstance = new action_1.Action(action);
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
class TableComponent extends basicComponent_1.BasicComponent {
    constructor() {
        super(...arguments);
        this.columns = [];
        this.props = {
            rowKey: 'id'
        };
    }
    getImports() {
        let imports = super.getImports();
        this.columns.forEach((column) => {
            imports = imports.concat(column.getImports());
        });
        return imports;
    }
    addProp(key, value) {
        let finalValue;
        if (key === 'columns') {
            const columnsData = value;
            this.columns = columnsData.map((columnData) => new TableColumn(columnData));
            const columnsCode = this.columns.map((column) => column.toCode());
            finalValue = `[
                ${columnsCode.join(',\n')}
            ]`;
        }
        else {
            finalValue = `${value}`;
        }
        super.addProp(key, finalValue);
    }
    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            const propValue = this.props[propKey];
            debug(`propKey: ${propKey}`);
            debug(`propValue: ${propValue}`);
            propsCode.push(`${propKey}={${propValue}}`);
        }
        return `<${this.className}
            ${propsCode.join('\n')}
        />`;
    }
}
exports.TableComponent = TableComponent;
//# sourceMappingURL=tableComponent.js.map