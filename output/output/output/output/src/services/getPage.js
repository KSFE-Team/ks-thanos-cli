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
                            dataIndex: 'action'
                        }
                    ],
                }
            }
        ],
    };
}
exports.getPage = getPage;
//# sourceMappingURL=getPage.js.map