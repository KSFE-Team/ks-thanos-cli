import { ComponentJSON } from 'Src/types/ComponentJSON';

interface FragmentConfig extends ComponentJSON {
    stateName: string;
    componentName: string;
    components?: Array<{}>; // 区域块内的组件
    fragmentName: string; // 区域块名称
}
/**
 * 获取初始化JSON
 */
export const getInitJson = (): FragmentConfig => ({
    stateName: '',
    componentName: 'Fragment',
    source: 'React',
    default: false,
    components: [], // 区域块内的组件
    fragmentName: '', // 区域块名称
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Fragment',
    icon: 'form',
    componentName: 'Fragment',
    groupType: 'container',
});

export const validator = (item: any): void => {};

/* 组件转换JSON */
export const toCode = (config: FragmentConfig, formConfig: FragmentConfig): FragmentConfig => {
    console.log(config, formConfig, '----');
    return {
        ...config,
        ...formConfig,
        source: 'React',
    };
};
