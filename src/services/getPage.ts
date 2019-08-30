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
                        'key': 'name1',
                        'label': '名字',
                        'id': '5ivoubchgjx',
                        'parentId': 'm7c9g9zy3uc',
                        'props': {
                            'placeholder': '名字'
                        }
                    },
                    {
                        'stateName': 'table',
                        'componentName': 'Input',
                        'source': 'antd',
                        'default': false,
                        'key': 'name2',
                        'label': '名字',
                        'id': '5ivoubchgjx',
                        'parentId': 'm7c9g9zy3uc',
                        'props': {
                            'placeholder': '名字'
                        }
                    },
                    {
                        "stateName": "dateObj",
                        "componentName": "RangePicker",
                        "source": "antd",
                        "default": false,
                        "key": "createTime",
                        "label": "创建时间",
                        "parentComponentName": "DatePicker",
                        "props": {
                            "format": "YYYY-MM-DD HH:mm:ss",
                            "showTime": {"format": "HH:mm"},
                            "placeholder": ["开始时间", "截止时间"]
                        },
                        "id": "shwh0urbw4c"
                    }
                ],
                'stateName': 'table1111',
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
            }
        ]
    };
}