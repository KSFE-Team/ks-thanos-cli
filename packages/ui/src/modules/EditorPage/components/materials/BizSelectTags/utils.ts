import { ComponentJSON } from 'Src/types/ComponentJSON';
import { baseValidator } from '../../../utils';
import { ISREQUIRED_TYPE } from '../../../utils/constants';

const [{ VALUE: REQUIRED }] = ISREQUIRED_TYPE;

interface BizSelectTagsConfig extends ComponentJSON {
    key: string;
    label: string;
    isRequired: boolean;
    componentType: string;
    type: string;
    source: string;
    showTagKey: string;
    buttonText: string;
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): BizSelectTagsConfig => ({
    componentName: 'BizSelectTags',
    source: 'Src/components/@ks/kms-bizselecttags',
    default: false,
    key: '',
    label: '',
    componentType: 'cloud',
    isRequired: REQUIRED,
    type: '',
    showTagKey: 'name',
    buttonText: '添加',
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'BizSelectTags',
    icon: 'calendar',
    componentName: 'BizSelectTags',
    cloudName: '@ks/kms-bizselecttags',
    groupType: 'biz',
});

export const validator = (config: any) =>
    // eslint-disable-next-line consistent-return
    baseValidator(config).then(() => {
        if (!config.type) {
            return new Error('请选择类型');
        }
    });

export const toCode = (config: BizSelectTagsConfig, formConfig: BizSelectTagsConfig): BizSelectTagsConfig => {
    const formObject = {
        ...config,
        ...formConfig,
        componentType: 'cloud',
        source: 'Src/components/@ks/kms-bizselecttags',
        props: {
            type: formConfig.type,
        },
    };
    return { ...formObject };
};
