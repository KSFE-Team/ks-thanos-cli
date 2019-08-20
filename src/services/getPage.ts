export async function getPage(pageName: string) {
    return { 
        'components': [
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