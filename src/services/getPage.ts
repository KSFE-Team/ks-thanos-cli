export async function getPage() {
    return {
        'components': [
            {
                'stateName': 'orderState',
                'componentName': 'Select',
                'source': 'antd',
                'default': false,
                'key': 'selectState',
                'props': {
                    'disabled': false,
                    'placeholder': 'placeholder',
                    'showSearch': true,
                    'allowClear': true
                },
                'defaultValue': '订单',
                'label': 'firstLabel',
                'options': [
                    {
                        'props': {
                            'disabled': false,
                            'key': '1',
                            'title': 'title1',
                            'value': '第一个option',
                        },
                        'label': '第一个内容',
                    },
                    {
                        'props': {
                            'disabled': false,
                            'key': '2',
                            'title': 'title2',
                            'value': '第二个option',
                        },
                        'label': '第二个内容',
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
            }
        ]
    };
}
