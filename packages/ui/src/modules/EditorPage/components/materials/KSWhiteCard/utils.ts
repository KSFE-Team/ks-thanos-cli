import { ComponentJSON } from 'Src/types/ComponentJSON';

interface KSWhiteCardConfig extends ComponentJSON {
    stateName: string;
    componentName: string;
    components?: Array<{}>; // 区域块内的组件
    title: string; // 区域块名称
}
/**
 * 获取初始化JSON
 */
export const getInitJson = (): KSWhiteCardConfig => ({
    stateName: '',
    componentName: 'KSWhiteCard',
    source: 'React',
    default: false,
    components: [], // 区域块内的组件
    title: '', // 卡片title名称
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'KSWhiteCard',
    icon: 'form',
    componentName: 'KSWhiteCard',
    groupType: 'container',
});

export const validator = (item: any): void => {};

/* 组件转换JSON */
export const toCode = (config: KSWhiteCardConfig, formConfig: KSWhiteCardConfig): KSWhiteCardConfig => {
    const formObject = {
        ...config,
        ...formConfig,
        props: {
            title: formConfig.title,
        },
    };
    delete formObject.props;
    return { ...formObject };
};
