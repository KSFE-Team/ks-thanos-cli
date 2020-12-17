import { ComponentJSON } from 'Src/types/ComponentJSON';
import { baseValidator } from '../../../utils';
import { ISREQUIRED_TYPE } from '../../../utils/constants';

const [{ VALUE: REQUIRED }] = ISREQUIRED_TYPE;

interface BizSelectUploadConfig extends ComponentJSON {
    key: string;
    label: string;
    isRequired: boolean;
    placeholder: string;
    componentType: string;
    fileType: string;
    multiple: boolean;
    source: string;
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): BizSelectUploadConfig => ({
    componentName: 'BizSelectUpload',
    source: 'Src/components/@ks/kms-bizselectupload',
    default: false,
    placeholder: '请选择对应内容',
    key: '',
    label: '',
    componentType: 'cloud',
    isRequired: REQUIRED,
    fileType: '',
    multiple: false,
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'BizSelectUpload',
    icon: 'calendar',
    componentName: 'BizSelectUpload',
    cloudName: '@ks/kms-bizselectupload',
    groupType: 'biz',
});

export const validator = (config: any) =>
    // eslint-disable-next-line consistent-return
    baseValidator(config).then(() => {
        if (!config.fileType) {
            return new Error('请选择类型');
        }
    });

export const toCode = (config: BizSelectUploadConfig, formConfig: BizSelectUploadConfig): BizSelectUploadConfig => {
    const formObject = {
        ...config,
        componentType: 'cloud',
        key: formConfig.key,
        label: formConfig.label,
        props: {
            fileType: formConfig.fileType,
            multiple: formConfig.multiple,
        },
    };
    delete formObject.fileType;
    delete formObject.multiple;
    return { ...formObject };
};
export const reCode = (config: BizSelectUploadConfig): BizSelectUploadConfig => {
    return {
        ...config,
        ...config.props,
    };
};
