export async function getPage(pageName: string) {
    return {
        name: pageName, // 页面名称
        components: [ // 页面组件
            {
                name: 'KSTable', // 组件名称
                source: 'ks-cms-ui', // 组件来源
                default: false, // 是否默认导出
                dependencies: [ // 数据依赖
                    {
                        type: 'fetch', // 数据来源类型 fetch 接口， dict 本地字典
                        api: '/api/user/list', // 接口地址
                        responseType: 'list', // 接口返回类型， // list 列表， object 对象
                    }
                ],
                props: { // KSTable 属性
                    columns: [
                        {
                            title: '系统名称', // 表头
                            dataIndex: 'systemName', // 解析字段
                        },
                        {
                            title: '电话',
                            dataIndex: 'mobile'
                        },
                        {
                            title: '操作', // 操作栏
                            actions: [ // 以 actions 为标示， 渲染button
                                {
                                    name: '删除', // 操作名称
                                    api: '/api/user/delete', // 接口地址
                                    method: 'post', // 请求方式 默认 'get'
                                    type: 'confirm', // confirm | modal | request | link
                                    title: '确认删除',
                                    trigger: {
                                        name: 'button',
                                        source: 'antd',
                                        default: false,
                                        components: [],
                                        props: {}
                                    }
                                }
                            ]
                        }
                    ],
                }
            }
        ],
    };
}