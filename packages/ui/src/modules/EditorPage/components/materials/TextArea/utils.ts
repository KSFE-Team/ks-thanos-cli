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
    placeholder: '请输入备注信息',
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
    groupType: 'basic',
});

export const validator = (config: any) => baseValidator(config);

export const toCode = (config: TextAreaConfig, formConfig: TextAreaConfig): TextAreaConfig => {
    const { placeholder, ...otherFormConfig } = formConfig;
    const formObject = {
        ...config,
        ...otherFormConfig,
        parentComponentName: 'Input',
        props: {
            placeholder,
        },
    };
    return { ...formObject };
};
