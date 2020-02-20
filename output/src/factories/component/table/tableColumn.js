"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basicElement_1 = require("Src/factories/basicElement");
const manager_1 = require("../manager");
class TableColumn extends basicElement_1.BasicContainer {
    constructor(page, config) {
        super();
        this.page = page;
        this.config = config;
        this.title = config.title;
        this.dataIndex = config.dataIndex;
        if (config.component) {
            manager_1.ComponentManager.add(this, config.component);
        }
    }
    addComponent(component) {
        this.component = component;
    }
    getImports() {
        if (this.component) {
            return this.component.getImports();
        }
        return [];
    }
    toCode() {
        let codes = [];
        const { component, ...otherConfig } = this.config;
        Object.entries(otherConfig).forEach((keyValue) => {
            const [key, value] = keyValue;
            codes.push(`${key}: '${value}'`);
        });
        if (this.component) {
            let recordCode = '';
            if (this.component.effect) {
                const effectParams = this.component.effect.params;
                recordCode = effectParams.filter((param) => !param.defaultValue).map((param) => param.name).join(',\n');
            }
            codes.push(`render: (text, ${recordCode ? `{ ${recordCode} }` : 'record'}) => {
                return (
                    <div>
                        ${this.component.toCode()}
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