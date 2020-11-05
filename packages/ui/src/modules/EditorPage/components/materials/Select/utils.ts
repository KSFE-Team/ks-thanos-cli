import { ComponentJSON } from 'Src/types/ComponentJSON';
import { baseValidator } from '../../../utils';
import { ISREQUIRED_TYPE } from '../../../utils/constants';

const [{ VALUE: REQUIRED }] = ISREQUIRED_TYPE;

interface SelectConfig extends ComponentJSON {
    key: string;
    label: string;
    isRequired: boolean;
    allowClear: boolean;
    disabled: boolean;
    showSearch: boolean;
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): SelectConfig => ({
    componentName: 'Select',
    source: 'antd',
    default: false,
    key: '',
    label: '',
    isRequired: REQUIRED,
    allowClear: false,
    disabled: false,
    showSearch: false,
    props: {},
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Select',
    icon: 'edit',
    componentName: 'Select',
});

export const validator = async (config: any) => {
    const { options = [] } = config;
    if (!options.length) {
        return new Error('请至少添加一个Option');
    }
    const result: any = await baseValidator(config);
    return new Error(result);
};

export const toCode = (config: SelectConfig, formConfig: SelectConfig): SelectConfig => {
    const { allowClear, disabled, showSearch } = formConfig;
    const result: any = {
        ...config,
        ...formConfig,
        props: {
            placeholder: formConfig.label,
            allowClear,
            disabled,
            showSearch,
        },
    };
    return result;
};
