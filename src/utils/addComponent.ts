import Page from '../factories/page/index';
import { Component, ComponentConfig } from '../factories/component/basic';
import { COMPONENT_TYPES } from './constants/component';
import { Table, TableComponentConfig } from '../factories/component/table';
import { Form, FormComponentConfig } from '../factories/component/form';
import { Input } from '../factories/component/input';
import { FormItemConfig } from 'Src/factories/component/form/formItem';

export function addComponent(
    page: Page,
    instance: Component | Page,
    component: ComponentConfig,
) {
    let componentInstance: Component | undefined;
    switch (component.componentName) {
        case COMPONENT_TYPES.TABLE:
            componentInstance = new Table(page, component as TableComponentConfig);
            instance.addComponent(componentInstance);
            break;
        case COMPONENT_TYPES.FORM:
            componentInstance = new Form(page, component as FormComponentConfig);
            instance.addComponent(componentInstance);
            break;
        case COMPONENT_TYPES.INPUT:
            componentInstance = new Input(page, component as FormItemConfig);
            instance.addComponent(componentInstance);
    }
    if (componentInstance) {
        if (component.components) {
            component.components.forEach((component) => {
                addComponent(page, componentInstance as Component, component);
            });
        }
        componentInstance.init();
    }
}