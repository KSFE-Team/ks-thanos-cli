import { ComponentJSON } from 'Src/types/ComponentJSON';
import { baseValidator } from '../../../utils';
import { ISREQUIRED_TYPE } from '../../../utils/constants';

const [{ VALUE: REQUIRED }] = ISREQUIRED_TYPE;

export interface Option {
    label: string;
    value: any;
    text?: any;
}

export interface RadioConfig extends ComponentJSON {
    key: string;
    label: string;
    isRequired: boolean;
    options: Option[];
}
/**
 * 获取初始化JSON
 */
export const getInitJson = (): RadioConfig => ({
    componentName: 'Radio',
    source: 'antd',
    default: false,
    key: '',
    label: '',
    isRequired: REQUIRED,
    options: [
        { value: 1, label: '开启' },
        { value: 0, label: '禁用' },
    ],
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Radio',
    icon: 'edit',
    componentName: 'Radio',
    groupType: 'basic',
});

export const validator = (config: any) => baseValidator(config);

export const toCode = (config: RadioConfig, formConfig: RadioConfig): RadioConfig => {
    return {
        ...config,
        ...formConfig,
        props: {
            placeholder: formConfig.label,
        },
    };
};
