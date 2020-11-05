import { ComponentJSON } from 'Src/types/ComponentJSON';
import { baseValidator } from '../../../utils';
import { ISREQUIRED_TYPE } from '../../../utils/constants';

const [{ VALUE: REQUIRED }] = ISREQUIRED_TYPE;

interface TextAreaConfig extends ComponentJSON {
    key: string;
    label: string;
    isRequired: boolean;
    placeholder: string;
    parentComponentName: string;
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): TextAreaConfig => ({
    componentName: 'TextArea',
    source: 'antd',
    default: false,
    placeholder: '请选择时间',
    parentComponentName: 'Input',
    key: '',
    label: '',
    isRequired: REQUIRED,
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'TextArea',
    icon: 'calendar',
    componentName: 'TextArea',
});

export const validator = (config: any) => baseValidator(config);

export const toCode = (config: TextAreaConfig, formConfig: TextAreaConfig): TextAreaConfig => {
    const formObject = {
        ...config,
        ...formConfig,
        parentComponentName: 'Input',
        props: {
            placeholder: formConfig.placeholder,
        },
    };
    delete formObject.placeholder;
    return { ...formObject };
};
