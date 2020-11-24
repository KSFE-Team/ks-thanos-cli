import { ComponentJSON } from 'Src/types/ComponentJSON';

interface ColConfig extends ComponentJSON {
    span: number;
}
/**
 * 获取初始化JSON
 */
export const getInitJson = (): ColConfig => ({
    componentName: 'Col',
    source: 'antd',
    default: false,
    span: 24,
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Col',
    icon: 'square',
    componentName: 'Col',
    groupType: 'container',
    accept: ['Row'],
});

/* form组件配置校验 */
export const validator = (item: any): undefined | Error => {
    if (!item.span) {
        return new Error('请填写span值');
    }
    return undefined;
};

/* 组件转换JSON */
export const toCode = (config: ColConfig, formConfig: ColConfig): ColConfig => {
    const { span } = formConfig;
    return {
        ...config,
        ...formConfig,
        props: {
            span,
        },
    };
};
