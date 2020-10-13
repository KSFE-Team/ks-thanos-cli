/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'Fragment',
    source: '',
    default: false,
    key: '',
    label: '',
    components: [], // 区域块内的组件
    fragmentName: '', // 区域块名称
    showKey: '',
    showValue: ''
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Fragment',
    icon: 'form',
    componentName: 'Fragment'
});
