import { getUniqueID } from 'Src/utils';

interface ElementConfig {
    // accpet: string[];
    // componentType: string;
    id?: string;
    // validator(): Promise<any> | boolean;
    // toCode(): string;
}

export default abstract class BasicElement {
    accpet: string[] = [];

    groupType: string = '';

    id: string = '';

    config: {
        [name: string]: any;
    } = {};

    constructor(config: ElementConfig = {}) {
        if ('id' in config && config.id) {
            this.id = config.id;
        } else {
            this.id = getUniqueID();
        }
    }

    /**
     * 校验相关数据是否必填
     */
    abstract validator(): Promise<any> | boolean;

    /**
     * 获取json
     */
    abstract toCode(): string;

    /**
     * 打开配置
     */
    abstract openConfig(): void;
}
