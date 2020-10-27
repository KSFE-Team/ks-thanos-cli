import { Component, ComponentConfig } from 'Src/factories/component/basic';
import Page from 'Src/factories/page';
import { TableColumn } from './table/tableColumn';
import { COMPONENT_TYPES_MAP } from 'Src/utils/constants/component';
// import { BizSelectModal } from 'Src/factories/component/cloudComponent';
// import { FormItemConfig } from './formItem';
import File from './relationTable/file';

export class ComponentManager {
    /**
     * 为目标元素添加组件
     * @param target 目标组件/页面
     * @param config 组件配置
     */
    static add(
        target: Component | Page | TableColumn,
        config: ComponentConfig,
    ) {
        let page: Page,
            componentInstance: Component | undefined;
        if (target instanceof Page || target instanceof File) {
            page = target;
        } else {
            page = target.page;
        }

        let TargetComponentClass = COMPONENT_TYPES_MAP[config.componentName];
        if (TargetComponentClass) {
            componentInstance = new TargetComponentClass(page, config);
            target.addComponent(componentInstance);
        }
        // else if (config.componentType === 'cloud') {
        //     // kms云组件
        //     componentInstance = new BizSelectModal(page, config as FormItemConfig);
        //     target.addComponent(componentInstance);
        // }

        if (componentInstance) {
            if (config.components && config.componentName !== 'RelationTable') {
                config.components.forEach((itemConfig) => {
                    ComponentManager.add(componentInstance as Component, itemConfig);
                });
            }
            componentInstance.init();
        }
    }
}
