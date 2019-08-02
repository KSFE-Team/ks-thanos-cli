"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getPage(pageName) {
    return {
        name: pageName,
        components: [
            {
                name: 'KSTable',
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
exports.getPage = getPage;
//# sourceMappingURL=getPage.js.map