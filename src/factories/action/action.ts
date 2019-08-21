import { Import } from '../page/types';
import { ConfirmComponent, ConfirmComponentConfig } from '../component/confirm';
import { Component, ComponentConfig } from '../component/basic';
import { LinkComponent, LinkComponentConfig } from '../component/link';
import Page from '../page';
import { BasicElement } from 'Src/factories/baseElement';
import { RequestComponent, RequestComponentConfig } from '../component/request/index';

type actionType = 'modal' | 'confirm' | 'request' | 'link';

export interface ActionConfig {
    name: string;
    title: string;
    type: actionType;
    dialog: ComponentConfig;
    trigger: ComponentConfig;
}

export class Action extends BasicElement {

    name: string
    type: actionType
    trigger: Component
    dialog?: Component

    constructor(page: Page, config: ActionConfig) {
        super();
        const { title, name, type, trigger } = config;
        this.name = name;
        this.type = type;
        this.trigger = new ConfirmComponent(page, {
            ...trigger as ConfirmComponentConfig,
            buttonText: name,
            title,
            componentName: `${page.pageName}Confrim`
        });
        switch (type) {
            case 'modal':
                break;
            case 'request':
                this.trigger = new RequestComponent(page, {
                    ...trigger as RequestComponentConfig,
                    text: name
                });
                break;
            case 'link':
                this.trigger = new LinkComponent(page, {
                    ...trigger as LinkComponentConfig,
                    text: name
                });
                break;
        }
        this.trigger.init();
    }

    getImports(): Import[] {
        let componentImports: Import[] = [];
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
