import { ComponentJSON } from 'Src/types/ComponentJSON';
import { baseValidator } from '../../../utils';
import { ISREQUIRED_TYPE } from '../../../utils/constants';

const [{ VALUE: REQUIRED }] = ISREQUIRED_TYPE;

interface DatePickerConfig extends ComponentJSON {
    key: string;
    label: string;
    isRequired: boolean;
    placeholder: string;
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): DatePickerConfig => ({
    componentName: 'DatePicker',
    source: 'antd',
    default: false,
    placeholder: '请选择时间',
    key: '',
    label: '',
    isRequired: REQUIRED,
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'DatePicker',
    icon: 'calendar',
    componentName: 'DatePicker',
});

export const validator = (config: any) => baseValidator(config);

export const toCode = (config: DatePickerConfig, formConfig: DatePickerConfig): DatePickerConfig => {
    console.log(config, '-----', formConfig, 'formConfig');
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
