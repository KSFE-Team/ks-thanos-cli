import { ISREQUIRED_TYPE } from '../../constants';

/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'Textarea',
    source: 'antd',
    default: false,
    props: {
        key: '',
        rows: '',
        placeholder: '',
    },
    key: '',
    label: '',
    placeholder: '',
    rows: '',
    isRequired: ISREQUIRED_TYPE[0].VALUE,
    defaultValue: '',
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Textarea',
    icon: 'edit',
    componentName: 'Textarea'
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
