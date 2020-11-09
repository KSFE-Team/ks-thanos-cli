import Dynamicnect from 'Src/components/Dynamicnect';

export const componentsMap: {
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

export const getContainerComponents = () => filterComponentsByType('container');

export const getBasicComponents = () => filterComponentsByType('basic');

export const getContentComponents = () => filterComponentsByType('content');

export const getBizComponents = () => filterComponentsByType('biz');

const filterComponentsByType = (type: string) =>
    Object.keys(componentsMap).reduce((prev: any[], key: string) => {
        const { tools } = componentsMap[key];
        const { getTools } = tools;
        const componentTools = getTools();
        if (componentTools.groupType === type) {
            return [...prev, componentTools];
        }
        return prev;
    }, []);

export const ACTION = {
    ADD: 'ADD',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
};

export const ONLYCOMPONENT = ['Form', 'Table', 'relationTable'];

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

/* 配置 - true false - 常量 */
export const BOOLEAN_TYPE = [
    { VALUE: true, LABEL: 'true' },
    { VALUE: false, LABEL: 'false' },
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
    TYPE: 'type',
};
