export async function getPage(pageName: string) {
    return {
        'components': [
            {
                'stateName': 'orderState',
                'componentName': 'Select',
                'source': 'antd',
                'default': false,
                'props': {
                    disabled: false,
                    placeholder: 'placeholder',
                    showSearch: true,
                    allowClear: true
                },
                'defaultValue': '订单',
                label: 'firstLabel',
                options: [
                    {
                        props: {
                            disabled: false,
                            key: '1',
                            title: 'title1',
                            value: '任小超太酷',
                            className: 'child-option'
                        },
                        lable: '第一个内容',
                    },
                    {
                        props: {
                            disabled: false,
                            key: '2',
                            title: 'title2',
                            value: '任小超太帅',
                            className: 'child-option-second'
                        },
                        lable: '第二个内容',
                    }
                ],
                // optGroup: OptGroupData[];
                'dependencies': {
                    'type': 'fetch',
                    'responseType': 'list',
                    'api': '/api/ser',
                    'method': 'GET'
                },
                'components': [],
            },
            {
                'components': [
                    {
                        'stateName': 'table',
                        'componentName': 'Input',
                        'source': 'antd',
                        'default': false,
                        'key': 'name',
                        'label': '名字',
                        'id': '5ivoubchgjx',
                        'parentId': 'm7c9g9zy3uc',
                        'configVisible': false,
                        'props': {
                            'placeholder': '名字'
                        }
                    }
                ],
                'stateName': 'table',
                'activeEvent': {
                    'eventType': 'api',
                    'dependencies': {
                        'type': 'fetch',
                        'responseType': 'list',
                        'api': '/api/ser',
                        'method': 'GET'
                    }
                },
                'componentName': 'Form',
                'source': 'antd',
                'default': false
            },
            {
                'stateName': 'table',
                'componentName': 'Table',
                'source': 'antd',
                'default': false,
                'props': {
                    'columns': [
                        {
                            'title': '示例',
                            'dataIndex': 'example'
                        },
                        {
                            'title': '名字',
                            'dataIndex': 'name'
                        },
                        {
                            title: '操作',
                            component: {
                                componentName: 'a', // 组件名称
                                text: '跳转',
                                type: 'link',
                                href: 'http://www.baidu.com',
                            }
                        }
                    ]
                },
                'dependencies': {
                    'type': 'fetch',
                    'responseType': 'list',
                    'api': '/api/ser',
                    'method': 'GET'
                },
                'components': [],
                'id': 'm7c9g9zy3uc',
                'configVisible': false
            }
        ]
    };
}