export async function getPage(pageName: string) {
    return {
        'components': [
            {
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
                'default': false,
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
                    },
                    {
                        'stateName': 'inputNumber',
                        'componentName': 'InputNumber',
                        'source': 'antd',
                        'default': false,
                        'key': 'keys',
                        'label': 'label',
                        'props': {
                            'min': 0,
                            'max': 0,
                            'defaultValue': 0,
                            'disabled': false,
                            'precision': 0,
                            'step': 1,
                        }
                    }
                ]
            }
        ]
    };
}