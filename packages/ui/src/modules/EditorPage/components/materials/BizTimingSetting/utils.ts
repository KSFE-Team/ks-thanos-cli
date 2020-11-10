import { ComponentJSON } from 'Src/types/ComponentJSON';
import { checkFields } from '../../../utils';
import { ISREQUIRED_TYPE } from '../../../utils/constants';

const [{ VALUE: REQUIRED }] = ISREQUIRED_TYPE;
export const CONFIG_TYPE = [
    {
        label: '时间',
        value: 'time',
    },
    {
        label: '日期时间',
        value: 'data',
    },
    {
        label: '默认全部',
        value: 'settingAll',
    },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ALAS_FiELDS = [
    {
        name: 'startTimeLabel',
        label: '上架时间表单Label',
        placeholder: '默认Label为：上架时间',
    },
    {
        name: 'startTime',
        label: '上架时间表单Key',
        placeholder: '默认Key为：startTime',
    },
    {
        name: 'endTimeLabel',
        label: '下架时间表单Label',
        placeholder: '默认Label为：下架时间',
    },
    {
        name: 'endTime',
        label: '下架时间表单Key',
        placeholder: '默认Key为：endTime',
    },
];

interface BizTimingSettingConfig extends ComponentJSON {
    type: string;
    isRequired: boolean;
    formFields: string;
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): BizTimingSettingConfig => ({
    componentName: 'BizTimingSetting',
    source: 'Src/components/@ks/kms-biztimingsetting',
    default: false,
    type: '',
    formFields: '',
    isRequired: REQUIRED,
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'BizTimingSetting',
    icon: 'calendar',
    componentName: 'BizTimingSetting',
    groupType: 'biz',
});

export const validator = (config: any) => {
    checkFields(
        config,
        [
            {
                key: 'isRequired',
                name: '是否必填',
            },
            {
                key: 'type',
                name: '定时配置类型',
            },
        ].map((item) => ({
            ...item,
            componentName: config.componentName,
        })),
    );
};

export const toCode = (config: BizTimingSettingConfig, formConfig: BizTimingSettingConfig): BizTimingSettingConfig => {
    const { type, isRequired, ...other } = formConfig;
    let formFields = {};
    ALAS_FiELDS.forEach((item) => {
        if (other[item.name]) {
            formFields = {
                ...formFields,
                [item.name]: other[item.name],
            };
        }
    });
    const formObject = {
        ...config,
        source: 'Src/components/@ks/kms-biztimingsetting',
        props: {
            type,
            required: isRequired,
            formFields: JSON.stringify(formFields),
        },
    };
    return { ...formObject };
};
