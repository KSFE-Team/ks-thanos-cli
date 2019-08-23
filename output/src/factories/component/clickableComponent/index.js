"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../basic/index");
const manager_1 = require("../../model/effect/manager");
class ClickableComponent extends index_1.Component {
    constructor(page, config) {
        super(page, config);
        this.type = config.type;
        this.text = config.text;
        this.href = config.href;
        this.confirm = config.confirm;
        this.config = config;
        if (config.dependencies) {
            this.effect = manager_1.EffectManager.create(config.stateName, page.model, config.dependencies);
        }
    }
    initEffects() {
        const pageModel = this.page.model;
        if (this.effect) {
            if (!pageModel.getEffect(this.effect.name)) {
                pageModel.addEffect(this.effect);
            }
        }
    }
    getClickCode() {
        let actionsCode = '';
        if (this.effect) {
            const paramsCode = this.effect.params.map((param) => {
                return param.defaultValue ? `${param.name}=${param.defaultValue}` : param.name;
            }).join(',\n');
            actionsCode = `
                actions.${this.page.pageName}.${this.effect.name}({
                    ${paramsCode}
                })
            `;
        }
        switch (this.type) {
            case 'link':
                return `window.location.href = '${this.config.href}'`;
            case 'confirm':
                const confirmConfig = this.confirm;
                const propsCode = Object.entries(confirmConfig).map((item) => {
                    const [key, value] = item;
                    return `${key}: ${value}`;
                }).join(',\n');
                return `
                    Modal.confirm({
                        ${propsCode},
                        onOk: () => {
                            ${actionsCode}
                        }
                    })
                `;
            case 'request':
                return actionsCode;
        }
    }
    toCode() {
        return `
            <${this.componentName}
                onClick={() => {
                    ${this.getClickCode()}
                }}
            >${this.text}</${this.componentName}>
        `;
    }
}
exports.ClickableComponent = ClickableComponent;
//# sourceMappingURL=index.js.map