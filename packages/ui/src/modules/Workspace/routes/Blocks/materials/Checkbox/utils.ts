import { ISREQUIRED_TYPE } from '../../constants';
/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'Checkbox',
    source: 'antd',
    default: false,
    isRequired: ISREQUIRED_TYPE[0].VALUE,
    defaultValue: '',
    options: [{
        props: {
            disabled: false,
            checked: false,
            value: ''
        },
        text: '',
        rowKey: 0
    }],
    label: '',
    key: '',
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Checkbox',
    icon: 'check-circle',
    componentName: 'Checkbox'
});

/**
 * 初始化state
 */
const VALUE = 'value';
const LABEL = 'label';
const TEXT = 'text';
const CHECK = 'checked';
const DISABLED = 'disabled';
const OPTIONS = 'options';
const KEY = 'key';
const ROW_KEY = 'rowKey';
const ISREQUIRED = 'isRequired';
const DEFAULTVALUE = 'defaultValue';

export const initState = {
    formData: {
        [OPTIONS]: [{
            props: {
                [DISABLED]: false,
                [CHECK]: false,
                [VALUE]: ''
            },
            [TEXT]: '',
            [ROW_KEY]: 0
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
    }
} as any;
