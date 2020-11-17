import { ComponentJSON } from 'Src/types/ComponentJSON';

interface RowConfig extends ComponentJSON {
    type: string;
    justify: string;
    align: string;
}
/**
 * 获取初始化JSON
 */
export const getInitJson = (): RowConfig => ({
    componentName: 'Row',
    source: 'antd',
    default: false,
    type: '',
    justify: '',
    align: '',
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Row',
    icon: 'square',
    componentName: 'Row',
    groupType: 'container',
});

/* form组件配置校验 */
export const validator = (item: any): undefined | Error => {
    return undefined;
};

/* 组件转换JSON */
export const toCode = (config: RowConfig, formConfig: RowConfig): RowConfig => {
    return {
        ...config,
        ...formConfig,
    };
};
