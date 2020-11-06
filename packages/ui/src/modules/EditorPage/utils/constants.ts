import Dynamicnect from 'Src/components/Dynamicnect';

const componentsMap: {
    [key: string]: any;
} = {};

export const setComponents = (key: string, value: any) => {
    const result = {
        ...value,
        component: Dynamicnect(value.component, true),
        config: Dynamicnect(value.config, false),
    };
    componentsMap[key] = result;
};

export const getComponents = () => componentsMap;

/**
 * 表单布局
 */
export const FORMITEM_LAYOUT = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

/* 配置 - 是否必填 - 常量 */
export const ISREQUIRED_TYPE = [
    { VALUE: true, LABEL: '必填' },
    { VALUE: false, LABEL: '非必填' },
];

/**
 * 表单配置常量定义
 */
export const ALIAS = {
    KEY: '表单绑定Key', // 表单绑定key
    LABEL: '表单展示Label', // 表单对应展示名称
    PLACEHOLDER: 'Placeholder',
    DATE_FORMAT: '日期格式',
    SHOW_TIME: '是否有选择时间功能',
    TIME_FORMAT: '时间格式',
    TYPE: '类型',
    ISREQUIRED: '是否必填',
    DEFAULTVALUE: '默认值',
};

/* 表单常用绑定字段 */
export const FIELD_DICT = {
    KEY: 'key',
    LABEL: 'label',
    ISREQUIRED: 'isRequired',
};
