"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getPage(pageName) {
    return {
        name: pageName,
        components: [
            {
                name: 'KSTable',
                componentName: 'homeTable',
                source: 'ks-cms-ui',
                default: false,
                dependencies: [
                    {
                        type: 'fetch',
                        api: '/api/user/list',
                        responseType: 'list',
                    }
                ],
                props: {
                    columns: [
                        {
                            title: '系统名称',
                            dataIndex: 'systemName',
                        },
                        {
                            title: '电话',
                            dataIndex: 'mobile'
                        },
                        {
                            title: '操作',
                            actions: [
                                {
                                    name: '删除',
                                    api: '/api/user/delete',
                                    method: 'post',
                                    type: 'confirm',
                                    title: '确认删除',
                                    trigger: {
                                        name: 'button',
                                        componentName: 'tableConfirm',
                                        source: 'antd',
                                        default: false,
                                        components: [],
                                        props: {}
                                    }
                                }
                            ]
                        }
                    ],
                },
                searchForm: [
                    {
                        label: '用户姓名',
                        name: 'Input',
                        source: 'antd',
                        default: false,
                        key: 'userName',
                    }
                ]
            },
        ],
    };
}
exports.getPage = getPage;
//# sourceMappingURL=getPage.js.map