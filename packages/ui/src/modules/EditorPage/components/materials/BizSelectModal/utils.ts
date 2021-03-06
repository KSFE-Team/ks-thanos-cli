import { ComponentJSON } from 'Src/types/ComponentJSON';
import { baseValidator } from '../../../utils';
import { ISREQUIRED_TYPE } from '../../../utils/constants';

const [{ VALUE: REQUIRED }] = ISREQUIRED_TYPE;

interface BizSelectModalConfig extends ComponentJSON {
    key: string;
    label: string;
    isRequired: boolean;
    placeholder: string;
    componentType: string;
    type: string;
    source: string;
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): BizSelectModalConfig => ({
    componentName: 'BizSelectModal',
    source: 'Src/components/@ks/kms-bizselectmodal',
    default: false,
    placeholder: '请选择对应内容',
    key: '',
    label: '',
    componentType: 'cloud',
    isRequired: REQUIRED,
    type: '',
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'BizSelectModal',
    icon: 'calendar',
    componentName: 'BizSelectModal',
    cloudName: '@ks/kms-bizselectmodal',
    groupType: 'biz',
});

export const validator = (config: any) =>
    // eslint-disable-next-line consistent-return
    baseValidator(config).then(() => {
        if (!config.type) {
            return new Error('请选择类型');
        }
    });

export const toCode = (config: BizSelectModalConfig, formConfig: BizSelectModalConfig): BizSelectModalConfig => {
    const formObject = {
        ...config,
        componentType: 'cloud',
        key: formConfig.key,
        label: formConfig.label,
        props: {
            placeholder: formConfig.label,
            type: formConfig.type,
        },
    };
    return { ...formObject };
};
export const reCode = (config: BizSelectModalConfig): BizSelectModalConfig => {
    return {
        ...config,
        ...config.props,
    };
};
