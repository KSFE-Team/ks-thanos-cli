/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'RelationTable',
    source: 'antd',
    default: false,
    props: {
        columns: [{title: '序号', dataIndex: 'sortNum'}]
    },
    dependencies: {},
    components: []
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'RelationTable',
    icon: 'table',
    componentName: 'RelationTable'
});
