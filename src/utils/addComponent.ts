import Page from '../factories/page/index';
import { Component, ComponentConfig } from '../factories/component/basic';
import { COMPONENT_TYPES_MAP } from './constants/component';
import { TableColumn } from '../factories/component/table/tableColumn';

/**
 * 根据配置为目标组件/页面添加子组件
 */
export function addComponent(
    target: Component | Page | TableColumn, // 目标组件/页面
    config: ComponentConfig, // 组件配置
) {
    let page: Page,
        componentInstance: Component | undefined;
    if (target instanceof Page) {
        page = target;
    } else {
        page = target.page;
    }

    const TargetComponentClass = COMPONENT_TYPES_MAP[config.componentName];
    if (TargetComponentClass) {
        componentInstance = new TargetComponentClass(page, config);
        target.addComponent(componentInstance);
    }

    if (componentInstance) {
        if (config.components) {
            config.components.forEach((itemConfig) => {
                addComponent(componentInstance as Component, itemConfig);
            });
        }
        componentInstance.init();
    }
}