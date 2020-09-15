import { ISREQUIRED_TYPE } from '../../constants';

/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'Radio',
    source: 'antd',
    default: false,
    key: 'status',
    label: '状态',
    isRequired: ISREQUIRED_TYPE[0].VALUE,
    defaultValue: '',
    options: [
        {value: 1, disabled: false, rowKey: 1, text: '启用', fragmentName: ''},
        {value: 0, disabled: false, rowKey: 2, text: '禁用', fragmentName: ''}
    ],
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Radio',
    icon: 'edit',
    componentName: 'Radio'
});

/**
 * 初始化state
 */
const VALUE = 'value';
const LABEL = 'label';
const TEXT = 'text';
const DISABLED = 'disabled';
const OPTIONS = 'options';
const SELECT = 'fragmentId';
const KEY = 'key';
const ROW_KEY = 'rowKey';
const ISREQUIRED = 'isRequired';
const DEFAULTVALUE = 'defaultValue';
// eslint-disable-next-line no-redeclare
export const initState = {
    formData: {
        [OPTIONS]: [{
            [DISABLED]: false,
            [VALUE]: '',
            [TEXT]: '',
            [ROW_KEY]: 0,
            [SELECT]: ''
        }],
        [LABEL]: '',
        [KEY]: '',
        [ISREQUIRED]: ISREQUIRED_TYPE[0].VALUE,
        [DEFAULTVALUE]: ''
    },
    isTouch: false,
    errMessage: '',
    current: {
        id: '',
        props: {}
    },
    selectOption: []
};
