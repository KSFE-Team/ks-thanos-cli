import { ComponentJSON } from 'Src/types/ComponentJSON';
import { FORM_TYPES } from './constants';

const [{ key: NORMAL_FORM }] = FORM_TYPES;

interface FormConfig extends ComponentJSON {
    stateName: string;
    type: string;
    saveApi?: string;
    updateApi?: string;
    getApi?: string;
}
/**
 * 获取初始化JSON
 */
export const getInitJson = (): FormConfig => ({
    componentName: 'Form',
    source: 'antd',
    default: false,
    stateName: '',
    type: NORMAL_FORM,
    saveApi: '',
    updateApi: '',
    getApi: '',
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Form',
    icon: 'form',
    componentName: 'Form',
    groupType: 'container',
});

// eslint-disable-next-line consistent-return
/* form组件配置校验 */
export const validator = (item: any): undefined | Error => {
    if (!item.stateName) {
        return new Error('请填写表单存储key');
    }
    if (!item.type) {
        return new Error('请选择表单类型');
    }
    if (item.type === 'normal') {
        if (['saveApi', 'updateApi', 'getApi', 'paramKey'].some((key) => !item[key])) {
            return new Error('请填写表单信息');
        }
    }
    return undefined;
};

/* 组件转换JSON */
export const toCode = (config: FormConfig, formConfig: FormConfig): FormConfig => {
    return {
        ...config,
        ...formConfig,
    };
};
