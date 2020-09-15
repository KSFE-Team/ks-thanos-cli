import { ISREQUIRED_TYPE } from '../../constants';

/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'DatePicker',
    source: 'antd',
    default: false,
    placeholder: '',
    key: '',
    label: '',
    isRequired: ISREQUIRED_TYPE[0].VALUE,
    defaultValue: '',
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'DatePicker',
    icon: 'calendar',
    componentName: 'DatePicker'
});

const ISREQUIRED = 'isRequired';
const DEFAULTVALUE = 'defaultValue';
/**
 * 初始化state
 */
export const initState = {
    showTime: true,
    format: 'YYYY-MM-DD',
    placeholder: '',
    key: '',
    label: '',
    current: {
        id: '',
        props: {}
    },
    [ISREQUIRED]: ISREQUIRED_TYPE[0].VALUE,
    [DEFAULTVALUE]: '',
    isTouch: false,
};
