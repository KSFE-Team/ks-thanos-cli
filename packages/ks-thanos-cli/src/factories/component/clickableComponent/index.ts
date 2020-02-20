import { Component } from '../basic/index';
import { ComponentConfig } from 'Src/factories/component/basic';
import Page from 'Src/factories/page';
import { EffectConfig } from 'Src/factories/model/effect';
import { EffectManager } from 'Src/factories/model/effect/manager';

type ClickableType = 'link' | 'request' | 'confirm';

interface ConfirmConfig {
    title: string;
    content: string;
}

export interface ClickableComponentConfig extends ComponentConfig {
    type: ClickableType;
    text: string;
    href?: string;
    dependencies?: EffectConfig;
    confirm?: ConfirmConfig;
}

export class ClickableComponent extends Component {

    text: string
    type: ClickableType
    config: ClickableComponentConfig
    href?: string;
    confirm?: ConfirmConfig;

    constructor(page: Page, config: ClickableComponentConfig) {
        super(page, config);
        this.type = config.type;
        this.text = config.text;
        this.href = config.href;
        this.confirm = config.confirm;
        this.config = config;
        if (config.dependencies) {
            this.effect = EffectManager.create(config.stateName, page.model, config.dependencies);
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

    getClickCode(): string {
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
                const confirmConfig = this.confirm as ConfirmConfig;
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
