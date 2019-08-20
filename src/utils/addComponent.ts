import Page from '../factories/page/index';
import { Component, ComponentConfig } from '../factories/component/basic';
import { COMPONENT_TYPES } from './constants/component';
import { Table, TableComponentConfig } from '../factories/component/table';
import { Form, FormComponentConfig } from '../factories/component/form';
import { Input } from '../factories/component/input';
import { FormItemConfig } from 'Src/factories/component/form/formItem';

/**
 * 
 */
export function addComponent(
    target: Component | Page,
    component: ComponentConfig,
) {
    let page: Page,
        componentInstance: Component | undefined;
    if (target instanceof Page) {
        page = target;
    } else {
        page = target.page;
    }
    switch (component.componentName) {
        case COMPONENT_TYPES.TABLE:
            componentInstance = new Table(page, component as TableComponentConfig);
            target.addComponent(componentInstance);
            break;
        case COMPONENT_TYPES.FORM:
            componentInstance = new Form(page, component as FormComponentConfig);
            target.addComponent(componentInstance);
            break;
        case COMPONENT_TYPES.INPUT:
            componentInstance = new Input(page, component as FormItemConfig);
            target.addComponent(componentInstance);
    }
    if (componentInstance) {
        if (component.components) {
            component.components.forEach((component) => {
                addComponent(componentInstance as Component, component);
            });
        }
        componentInstance.init();
    }
}