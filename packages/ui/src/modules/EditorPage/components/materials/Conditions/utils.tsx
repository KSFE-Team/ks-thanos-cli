import { ComponentJSON } from 'Src/types/ComponentJSON';
import { baseValidator } from '../../../utils';
import { ISREQUIRED_TYPE } from '../../../utils/constants';

const [{ VALUE: REQUIRED }] = ISREQUIRED_TYPE;

interface ConditionsConfig extends ComponentJSON {
    isRequired: boolean;
    placeholder: string;
    componentType: string;
    source: string;
    formfields: Array<object>;
}

/**
 * 获取初始化JSON
 */
export const getInitJson = (): ConditionsConfig => ({
    componentName: 'Conditions',
    source: 'Src/components/@ks/kms-conditions',
    default: false,
    placeholder: '请选择配置项',
    componentType: 'cloud',
    isRequired: REQUIRED,
    formfields: [
        {
            key: 'tagCode', // PropTypes.string.isRequired
            isRequired: true, // PropTypes.bool 默认true
            type: 1, // 1kaishu、2huiben 默认1
        },
    ],
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Conditions',
    icon: 'calendar',
    componentName: 'Conditions',
    cloudName: '@ks/kms-conditions',
    groupType: 'biz',
});

export const validator = (config: any) =>
    // eslint-disable-next-line consistent-return
    baseValidator(config).then(() => {
        if (!config.type) {
            return new Error('请选择类型');
        }
    });

export const toCode = (config: ConditionsConfig, formConfig: ConditionsConfig): ConditionsConfig => {
    const formObject = {
        ...config,
        componentType: 'cloud',
        source: 'Src/components/@ks/kms-conditions',
        props: {
            formfields: [
                {
                    key: 'tagCode', // PropTypes.string.isRequired
                    isRequired: true, // PropTypes.bool 默认true
                    type: 1, // 1kaishu、2huiben 默认1
                },
            ],
        },
    };
    return { ...formObject };
};
// 类型
export const optionValue = {
    tagCode: 'tagCode',
    memberTag: 'memberTag',
    clients: 'clients',
    filterCondition: 'filterCondition',
    includeChannelId: 'includeChannelId',
    excludeChannelId: 'excludeChannelId',
    isBeta: 'isBeta',
    isAbTest: 'isAbTest',
    status: 'status',
    sort: 'sort',
};

export const DEFAULT_OPTIONS = [
    {
        value: optionValue.tagCode,
        name: '用户标签',
    },
    {
        value: optionValue.memberTag,
        name: '会员标签',
    },
    {
        value: optionValue.clients,
        name: '终端类型',
    },
    {
        value: optionValue.filterCondition,
        name: '条件',
    },
    {
        value: optionValue.includeChannelId,
        name: '渠道',
    },
    {
        value: optionValue.excludeChannelId,
        name: '指定渠道不投放',
    },
    {
        value: optionValue.isBeta,
        name: '是否内测',
    },
    {
        value: optionValue.isAbTest,
        name: '是否启用AB测试',
    },
    {
        value: optionValue.status,
        name: '状态',
    },
    {
        value: optionValue.sort,
        name: '排序号',
    },
];
