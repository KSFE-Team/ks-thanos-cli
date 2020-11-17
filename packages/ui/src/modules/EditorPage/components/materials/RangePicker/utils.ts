import { ComponentJSON } from 'Src/types/ComponentJSON';
import { baseValidator } from '../../../utils';
import { ISREQUIRED_TYPE } from '../../../utils/constants';

const [{ VALUE: REQUIRED }] = ISREQUIRED_TYPE;
const reg = /^[\u4e00-\u9fa5]+\/{1}[\u4e00-\u9fa5]+$/;
interface RangePickerConfig extends ComponentJSON {
    key: string;
    label: string;
    isRequired: boolean;
    placeholder: string;
    parentComponentName: string;
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): RangePickerConfig => ({
    componentName: 'RangePicker',
    source: 'antd',
    default: false,
    parentComponentName: 'KSDatePicker',
    placeholder: '请选择时间',
    key: '',
    label: '',
    isRequired: REQUIRED,
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'RangePicker',
    icon: 'calendar',
    componentName: 'RangePicker',
    groupType: 'basic',
});

export const validator = (config: any) =>
    // eslint-disable-next-line consistent-return
    baseValidator(config).then(() => {
        if (config.placeholder) {
            if (!reg.test(config.placeholder)) {
                return new Error('请输入汉字且用“/”进行分割！');
            }
        }
    });

export const toCode = (config: RangePickerConfig, formConfig: RangePickerConfig): RangePickerConfig => {
    const formObject = {
        ...config,
        ...formConfig,
        parentComponentName: 'KSDatePicker',
        props: {
            placeholder: formConfig.placeholder,
        },
    };
    delete formObject.placeholder;
    return { ...formObject };
};
