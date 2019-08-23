import { Component, ComponentConfig } from 'Src/factories/component/basic';
import Page from 'Src/factories/page';
import { TableColumn } from './table/tableColumn';
import { COMPONENT_TYPES_MAP } from 'Src/utils/constants/component';

export class ComponentManager {
    static add(
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
                    ComponentManager.add(componentInstance as Component, itemConfig);
                });
            }
            componentInstance.init();
        }
    }
}