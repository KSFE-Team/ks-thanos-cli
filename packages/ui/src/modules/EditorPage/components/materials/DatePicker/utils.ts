import { ComponentJSON } from 'Src/types/ComponentJSON';
import { baseValidator } from '../../../utils';
import { ISREQUIRED_TYPE } from '../../../utils/constants';

const [{ VALUE: REQUIRED }] = ISREQUIRED_TYPE;

interface KSDatePickerConfig extends ComponentJSON {
    key: string;
    label: string;
    isRequired: boolean;
    placeholder: string;
    source: string;
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): KSDatePickerConfig => ({
    componentName: 'KSDatePicker',
    source: 'ks-cms-ui',
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
    name: 'KSDatePicker',
    icon: 'calendar',
    componentName: 'KSDatePicker',
    groupType: 'basic',
});

export const validator = (config: any) => baseValidator(config);

export const toCode = (config: KSDatePickerConfig, formConfig: KSDatePickerConfig): KSDatePickerConfig => {
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

export const reCode = (config: KSDatePickerConfig): KSDatePickerConfig => {
    const { props = {} } = config;
    return {
        ...config,
        placeholder: props.placeholder,
    };
};
