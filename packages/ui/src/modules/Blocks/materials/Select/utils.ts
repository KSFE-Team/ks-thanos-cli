import { ISREQUIRED_TYPE } from '../../constants';

/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'Select',
    source: 'antd',
    default: false,
    key: '',
    label: '',
    isRequired: ISREQUIRED_TYPE[0].VALUE,
    defaultValue: '',
    props: {
        placeholder: '',
        disabled: false,
        allowClear: true,
        showSearch: false
    },
    options: []
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Select',
    icon: 'down-square',
    componentName: 'Select'
});

const ISREQUIRED = 'isRequired';
const DEFAULTVALUE = 'defaultValue';
/**
 * 初始化state
 */
export const initState = {
    formData: {
        props: {},
        options: [],
        key: '',
        lable: '',
        [ISREQUIRED]: ISREQUIRED_TYPE[0].VALUE,
        [DEFAULTVALUE]: ''
    },
    isTouch: false,
    current: {
        id: '',
        props: {
            placeholder: '',
            disabled: false,
            allowClear: true,
            showSearch: false
        }
    }
} as any;
