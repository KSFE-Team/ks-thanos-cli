import { ComponentJSON } from 'Src/types/ComponentJSON';

interface ExtendContainerConfig extends ComponentJSON {
    label: string;
    key: string;
    sortKey: string;
    addButtonText: string;
}
/**
 * 获取初始化JSON
 */
export const getInitJson = (): ExtendContainerConfig => ({
    componentName: 'ExtendContainer',
    source: 'ks-cms-ui',
    default: false,
    label: '',
    key: '',
    sortKey: '',
    addButtonText: '',
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'ExtendContainer',
    icon: 'square',
    componentName: 'ExtendContainer',
    groupType: 'container',
    accept: ['Form', 'KSWhiteCard'],
});

// eslint-disable-next-line consistent-return
/* form组件配置校验 */
export const validator = (item: any): undefined | Error => {
    if (!item.label) {
        return new Error('请填写label');
    }
    if (!item.key) {
        return new Error('请填写key');
    }
    if (!item.sortKey) {
        return new Error('请填写sortKey');
    }
    if (!item.addButtonText) {
        return new Error('请填写addButtonText');
    }
    return undefined;
};

/* 组件转换JSON */
export const toCode = (config: ExtendContainerConfig, formConfig: ExtendContainerConfig): ExtendContainerConfig => {
    return {
        ...config,
        ...formConfig,
    };
};

/** 组件拖拽配置校验 */
export const verifyComponent = (sourceComponent: any, taegetCompoent: any, pageJson: any) => {
    const doNotPlace = ['ExtendContainer', 'draw', 'KSWhiteCard', 'Fragment'];
    const targetName = typeof taegetCompoent === 'string' ? taegetCompoent : taegetCompoent.componentName;
    if (doNotPlace.includes(targetName)) {
        return 'ExtendContainer组件可嵌套在Form，KSWhiteCard组件中，其他组件中不支持配置！';
    }
    return true;
};
