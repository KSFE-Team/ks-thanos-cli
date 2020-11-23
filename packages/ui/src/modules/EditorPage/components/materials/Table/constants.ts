/* 请求方式 */
export const FETCH_METHOD = [
    {
        VALUE: 'get',
        LABEL: 'GET',
    },
    {
        VALUE: 'post',
        LABEL: 'POST',
    },
];

/* 是否分页 */
export const IS_PAGINATION = [
    {
        VALUE: false,
        LABEL: '否',
    },
    {
        VALUE: true,
        LABEL: '是',
    },
];

/* 是否使用行选择 */
export const IS_ROW_SELECTION = [
    {
        VALUE: false,
        LABEL: '否',
    },
    {
        VALUE: true,
        LABEL: '是',
    },
];

/* 行选择类型 */
export const ROW_SELECTION_TYPE = [
    {
        VALUE: 'radio',
        LABEL: 'radio',
    },
    {
        VALUE: 'checkbox',
        LABEL: 'checkbox',
    },
];

export const DATA_TYPE = [
    {
        LABEL: '文本',
        VALUE: 'text',
    },
    {
        LABEL: '金额',
        VALUE: 'money',
    },
    {
        LABEL: '时间',
        VALUE: 'time',
    },
];
