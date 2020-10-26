import { FORM_TYPES } from './constants';

const [{ key: NORMAL_FORM }] = FORM_TYPES;
/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    componentName: 'Form',
    source: 'antd',
    default: false,
    config: {
        stateName: '',
        type: NORMAL_FORM,
        key: '',
        label: '',
        saveApi: '',
        updateApi: '',
        getApi: '',
        paramKey: '',
    },
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Form',
    icon: 'form',
    componentName: 'Form',
});

// eslint-disable-next-line consistent-return
export const validator = (item: any): undefined | Error => {
    if (!item.type) {
        return new Error('请选择表单类型');
    }
    if (item.type === 'normal') {
        if (['saveApi', 'updateApi', 'getApi', 'paramKey'].some((key) => !item[key])) {
            return new Error('请填写表单信息');
        }
    }
};

/**
 * 过滤云组件
 */
export const filterCloudComponents = (serverList: any[], localCloudConfig: any) => {
    return Object.keys(localCloudConfig).reduce((prev: any, key: string) => {
        const temp = prev;
        // const { getTools } = localCloudConfig[key];
        // const { cloudName = '' } = getTools();
        const cloudName = '';
        if (cloudName && serverList.some(({ name }) => `${name}` === `${cloudName}`)) {
            temp[key] = localCloudConfig[key];
        }
        return temp;
    }, {});
};

/**
 * 初始化state
 */
export const initState = {
    formData: {},
    isTouch: false,
};
