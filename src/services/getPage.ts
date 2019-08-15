export async function getPage(pageName: string) {
    return {
        'components': [
            {
                'components': [
                    {
                        'stateName': 'user',
                        'componentName': 'Input',
                        'source': 'antd',
                        'default': false,
                        'key': 'username',
                        'label': '姓名',
                        'id': 'zpv0n0220aj',
                        'parentId': 'soyu2flizbl',
                        'configVisible': false,
                        'props': {
                            'placeholder': '姓名'
                        }
                    }
                ],
                activeEvent: {
                    eventType: 'api',
                    'dependencies': {
                        'type': 'fetch',
                        'responseType': 'list',
                        'api': '/user/query',
                        'method': 'GET'
                    }
                },
                'stateName': 'user',
                'componentName': 'Form',
                'source': 'antd',
                'default': false
            },
            {
                'stateName': 'user',
                'componentName': 'Table',
                'source': 'antd',
                'default': false,
                'props': {
                    'columns': [
                        {
                            'title': '姓名',
                            'dataIndex': 'username'
                        }
                    ]
                },
                'dependencies': {
                    'type': 'fetch',
                    'responseType': 'list',
                    'api': '/user/query',
                    'method': 'GET'
                }, 
                'components': [], 
                'id': 'soyu2flizbl', 
                'configVisible': false
            }]
    };
}