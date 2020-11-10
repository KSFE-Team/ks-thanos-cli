import { ComponentJSON } from 'Src/types/ComponentJSON';
import { baseValidator } from '../../../utils';
import { ISREQUIRED_TYPE } from '../../../utils/constants';

const [{ VALUE: REQUIRED }] = ISREQUIRED_TYPE;

interface InputConfig extends ComponentJSON {
    key: string;
    label: string;
    isRequired: boolean;
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): InputConfig => ({
    componentName: 'Input',
    source: 'antd',
    default: false,
    key: '',
    label: '',
    isRequired: REQUIRED,
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Input',
    icon: 'edit',
    componentName: 'Input',
    groupType: 'basic',
});

export const validator = (config: any) => baseValidator(config);

export const toCode = (config: InputConfig, formConfig: InputConfig): InputConfig => {
    return {
        ...config,
        ...formConfig,
        props: {
            placeholder: formConfig.label,
        },
    };
};
