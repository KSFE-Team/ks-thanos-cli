import { getUniqueID } from 'Src/utils';
import { ComponentConfig } from './Page';

interface ElementConfig {
    accpet: string[];
    component: any[];
    componentType: string;
    id?: string;
    validator(): Promise<any> | boolean;
    toCode(): string;
}

export default abstract class BasicElement {
    accpet: string[] = [];
    components: any[] = [];

    groupType: string = '';

    id: string = '';

    config: {
        [name: string]: any;
    } = {};

    constructor(config: ElementConfig) {
        if ('id' in config && config.id) {
            this.id = config.id;
        } else {
            this.id = getUniqueID();
        }
    }

    /**
     * 添加组件
     */
    abstract addComponent(
        component: ComponentConfig, // 组件配置
    ): void;

    /**
     * 校验相关数据是否必填
     */
    abstract validator(): Promise<any> | boolean;

    /**
     * 获取json
     */
    abstract toCode(...args: any[]): string;

    /**
     * 打开配置
     */
    abstract openConfig(): void;
}
