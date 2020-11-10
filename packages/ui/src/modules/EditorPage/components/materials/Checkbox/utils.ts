import { ComponentJSON } from 'Src/types/ComponentJSON';
import { baseValidator } from '../../../utils';
import { ISREQUIRED_TYPE } from '../../../utils/constants';

const [{ VALUE: REQUIRED }] = ISREQUIRED_TYPE;

export interface Option {
    label: string;
    value: any;
    // props: {
    //     value: string;
    // };
}

export interface CheckboxConfig extends ComponentJSON {
    key: string;
    label: string;
    isRequired: boolean;
    options: Option[];
}
/**
 * 获取初始化JSON
 */
export const getInitJson = (): CheckboxConfig => ({
    componentName: 'Checkbox',
    source: 'antd',
    default: false,
    key: '',
    label: '',
    isRequired: REQUIRED,
    options: [],
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Checkbox',
    icon: 'check-circle',
    componentName: 'Checkbox',
    groupType: 'basic',
});

export const validator = (config: any) => baseValidator(config);

export const toCode = (config: CheckboxConfig, formConfig: CheckboxConfig): CheckboxConfig => {
    return {
        ...config,
        ...formConfig,
        props: {
            placeholder: formConfig.label,
        },
    };
};
