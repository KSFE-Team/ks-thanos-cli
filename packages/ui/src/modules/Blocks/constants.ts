export const env = process.env.NODE_ENV;
export const PROJECT_NAME = env === 'production' ? '/h5/ks-thanos' : '';

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

/**
 * 表单配置常量定义
 */
export const ALIAS = {
    KEY: '表单Key', // 表单绑定key
    LABEL: '表单Label', // 表单对应展示名称
    PLACEHOLDER: 'Placeholder',
    DATE_FORMAT: '日期格式',
    SHOW_TIME: '是否有选择时间功能',
    TIME_FORMAT: '时间格式',
    TYPE: '类型',
    ISREQUIRED: '是否必填',
    DEFAULTVALUE: '默认值'
};

/**
 * Tale类型
 */

export const TABLE_TYPE = {
    NORMAL: 1,
    PARENT_TABLE: 2,
    CHILDREN_TABLE: 3,
};

/**
 * 正则校验 - 汉字符
 */
export const CHARACTER_REG = /[\u4e00-\u9fa5]/;
export const CHARACTER_MESSAGE = '字段值不能为汉字符！请重新输入。';
// form 必校验的字段值
export const FIELD_ARR = ['key', 'label'];
// form 错误提示
export const FORM_MESSAGE = '请填写完整配置信息, * 号为必填项';

export const tempTabs = [
    {name: '库模版', index: 0},
    {name: '共享模版', index: 1},
    {name: '现有页面', index: 2}
];

export const ISREQUIRED_TYPE = [
    {VALUE: true, LABEL: '必填'},
    {VALUE: false, LABEL: '非必填'},
]
;
