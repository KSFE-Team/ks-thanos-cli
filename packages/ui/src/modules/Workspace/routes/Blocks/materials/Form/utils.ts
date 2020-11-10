import { FORM_TYPES } from './constants';

const [{ key: NORMAL_FORM }] = FORM_TYPES;
/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'Form',
    source: 'antd',
    default: false,
    type: NORMAL_FORM,
    key: '',
    label: '',
    saveApi: '',
    updateApi: '',
    getApi: '',
    paramKey: '',
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Form',
    icon: 'form',
    componentName: 'Form',
});

/**
 * 过滤云组件
 */
export const filterCloudComponents = (serverList: any[], localCloudConfig: any) => {
    return Object.keys(localCloudConfig).reduce((prev: any, key: string) => {
        const { getTools } = localCloudConfig[key];
        const { cloudName = '' } = getTools();
        if (cloudName && serverList.some(({ name }) => `${name}` === `${cloudName}`)) {
            prev = {
                ...prev,
                [key]: localCloudConfig[key],
            };
        }
        return prev;
    }, {});
};

/**
 * 初始化state
 */
export const initState = {
    formData: {},
    isTouch: false,
} as any;
