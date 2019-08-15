import { ComponentConfig } from '../component/types';
import { BasciImport } from '../page/types';
import { ConfirmComponent, ConfirmComponentStructure } from '../component/confirmComponent';
import { BasicComponent } from '../component/basicComponent';
import { LinkComponent, LinkComponentStructure } from '../component/linkComponent';
import Page from '../page';

type actionType = 'modal' | 'confirm' | 'request' | 'link';

export interface ActionStructure {
    name: string;
    title: string;
    type: actionType;
    dialog: ComponentConfig;
    trigger: ComponentConfig;
}

export class Action {

    name: string
    type: actionType
    dialog?: BasicComponent
    trigger: BasicComponent

    constructor(page: Page, config: ActionStructure) {
        const { title, name, type, trigger } = config;
        this.name = name;
        this.type = type;
        this.trigger = new ConfirmComponent(page, {
            ...trigger as ConfirmComponentStructure,
            buttonText: name,
            title,
            componentName: `${page.pageName}Confrim`
        });
        switch (type) {
            case 'modal':
                break;
            case 'request':
                break;
            case 'link':
                this.trigger = new LinkComponent(page, {
                    ...trigger as LinkComponentStructure,
                    text: name
                });
                break;
        }
        this.trigger.init();
    }

    getImports(): BasciImport[] {
        let componentImports: BasciImport[] = [];
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
