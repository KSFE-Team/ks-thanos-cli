import { ComponentJSON } from 'Src/types/ComponentJSON';
import { baseValidator } from '../../../utils';
import { ISREQUIRED_TYPE } from '../../../utils/constants';

const [{ VALUE: REQUIRED }] = ISREQUIRED_TYPE;

interface InputNumberConfig extends ComponentJSON {
    key: string;
    label: string;
    isRequired: boolean;
    placeholder: string;
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): InputNumberConfig => ({
    componentName: 'InputNumber',
    source: 'antd',
    default: false,
    placeholder: '请输入',
    key: '',
    label: '',
    isRequired: REQUIRED,
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'InputNumber',
    icon: 'calendar',
    componentName: 'InputNumber',
});

export const validator = (config: any) => baseValidator(config);

export const toCode = (config: InputNumberConfig, formConfig: InputNumberConfig): InputNumberConfig => {
    const formObject = {
        ...config,
        ...formConfig,
        props: {
            placeholder: formConfig.placeholder,
        },
    };
    delete formObject.placeholder;
    return { ...formObject };
};
