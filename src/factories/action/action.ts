import { ComponentStructure, ComponentInjection } from '../component/component';
import { Import } from '../page/types';
import { ConfirmComponent, ConfirmComponentStructure } from '../component/confirmComponent';
import { BasicComponent } from '../component/basicComponent';
import { LinkComponent, LinkComponentStructure } from '../component/linkComponent';

type actionType = 'modal' | 'confirm' | 'request' | 'link';

export interface ActionStructure {
    name: string;
    type: actionType;
    dialog: ComponentStructure;
    trigger: ComponentStructure;
}

export class Action {

    name: string
    type: actionType
    dialog?: ComponentInjection
    trigger: BasicComponent

    constructor(config: ActionStructure) {
        const { name, type, dialog, trigger } = config;
        this.name = name;
        this.type = type;
        switch (type) {
            case 'confirm':
                this.trigger = new ConfirmComponent(trigger as ConfirmComponentStructure);
                break;
            case 'modal':
                break;
            case 'request':
                break;
            case 'link':
                this.trigger = new LinkComponent(trigger as LinkComponentStructure);
                break;
        }
    }

    getImports(): Import[] {
        const componentImports: Import[] = [];
        if (this.dialog) {
            componentImports.concat(this.dialog.getImports());
        }
        componentImports.concat(this.trigger.getImports());
        return componentImports;
    }

    toCode() {
        return `
(text) => {
    return (
        <div>
            ${this.trigger.toCode()}        
        </div>
        ${this.dialog ? `<div>
            ${this.dialog.toCode()}
        </div>` : ''}
    );
}
`;
    }
}
