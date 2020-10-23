import { ISREQUIRED_TYPE } from 'Src/utils/constants';

/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'Input',
    source: 'antd',
    default: false,
    key: '',
    label: '',
    isRequired: ISREQUIRED_TYPE[0].VALUE,
    defaultValue: ''
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Input',
    icon: 'edit',
    componentName: 'Input'
});

const ISREQUIRED = 'isRequired';
const DEFAULTVALUE = 'defaultValue';

/**
 * 初始化state
 */
export const initState = {
    formData: {
        [ISREQUIRED]: ISREQUIRED_TYPE[0].VALUE,
        [DEFAULTVALUE]: ''
    },
    isTouch: false,
    current: {
        id: '',
        props: {}
    }
};
