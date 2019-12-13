import { Component, ComponentConfig } from '../../../../factories/component/basic';
import { TableColumn } from 'Src/factories/component/table/tableColumn';
import Page from 'Src/factories/page';
import File from '.';
import { COMPONENT_TYPES_MAP } from 'Src/utils/constants/component';
import { RELATION_TABLE_COMPONENTS } from '../components';

export class ComponentManager {
    /**
     * 为目标元素添加组件
     * @param target 目标组件/页面
     * @param config 组件配置
     */
    static add(
        target: Component | Page | TableColumn | File,
        config: ComponentConfig,
    ) {
        let file: Page | File,
            componentInstance: Component | undefined;
        if (target instanceof Page || target instanceof File) {
            file = target;
        } else {
            file = target.page;
        }

        let TargetComponentClass = RELATION_TABLE_COMPONENTS[config.componentName] || COMPONENT_TYPES_MAP[config.componentName];
        if (TargetComponentClass) {
            componentInstance = new TargetComponentClass(file, config);
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
