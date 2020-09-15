/**
 * 获取初始化JSON
 */
import {TABLE_TYPE} from '../../constants';

export const getInitJson = (tableType: any = TABLE_TYPE.NORMAL) => ({
    stateName: '',
    componentName: 'Table',
    source: 'antd',
    default: false,
    tableType: tableType,
    props: {
        columns: [{ title: '序号', dataIndex: 'sortNum' }]
    },
    dependencies: {},
    listName: '',
    components: [],
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Table',
    icon: 'table',
    componentName: 'Table'
});

export const initState = {
    api: '', // api path
    current: {
        id: '',
        stateName: '',
        tableType: 0,
        listName: ''
    }, // current component info
    currentIdx: '', // current component index
    dataSource: [], // table data
    editDataFlag: false,
    method: 'GET', // request method
    // searchComponentChecked: false, // checkbox search component check flag
    tableCount: 0, // table key
    showSelectedRows: false,
    showSelectedRowsType: 'radio',
    showPagination: true,
    isClear: false,
};
