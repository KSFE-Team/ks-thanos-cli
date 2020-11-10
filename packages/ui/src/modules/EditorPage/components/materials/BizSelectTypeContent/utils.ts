import { ComponentJSON } from 'Src/types/ComponentJSON';
import { checkFields } from '../../../utils';
import { FIELD } from './constants';

const FIELD_ARRAY = Object.values(FIELD);

interface BizSelectTypeContentConfig extends ComponentJSON {
    typeLabel: string;
    typeField: string;
    source: string;
    contentField: string;
    contentArr: Array<string>;
    aliasArry: any;
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): BizSelectTypeContentConfig => ({
    componentName: 'BizSelectTypeContent',
    source: 'Src/components/@ks/kms-BizSelectTypeContent',
    default: false,
    typeLabel: '',
    typeField: '',
    contentField: '',
    contentArr: [],
    aliasArry: false,
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'BizSelectTypeContent',
    icon: 'calendar',
    componentName: 'BizSelectTypeContent',
    cloudName: '@ks/kms-BizSelectTypeContent',
    groupType: 'biz',
});

export const validator = (config: any) =>
    checkFields(
        config,
        FIELD_ARRAY.map((item) => ({ ...item, componentName: config.componentName })),
    );

export const toCode = (
    config: BizSelectTypeContentConfig,
    formConfig: BizSelectTypeContentConfig,
): BizSelectTypeContentConfig => {
    const formConfigObj = formConfig;
    if ('aliasArry' in formConfig && formConfig.aliasArry) {
        formConfigObj.aliasArry = [];
    } else {
        delete formConfigObj.aliasArry;
    }
    const formObject = {
        ...config,
        source: 'Src/components/@ks/kms-BizSelectTypeContent',
        props: {
            params: JSON.stringify({
                ...formConfigObj,
            }),
        },
    };
    return { ...formObject };
};
