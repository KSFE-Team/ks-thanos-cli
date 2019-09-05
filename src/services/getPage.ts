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
                        'stateName': 'dateObj',
                        'componentName': 'RangePicker',
                        'source': 'antd',
                        'default': false,
                        'key': 'createTime',
                        'label': '创建时间',
                        'parentComponentName': 'DatePicker',
                        'props': {
                            'format': 'YYYY-MM-DD HH:mm:ss',
                            'showTime': {'format': 'HH:mm'},
                            'placeholder': ['开始时间', '截止时间']
                        },
                        'id': 'shwh0urbw4c'
                    },
                    {
                        'stateName': 'dateObj',
                        'componentName': 'Textarea',
                        'source': 'antd',
                        'default': false,
                        'key': 'createTime',
                        'label': '创建时间',
                        'parentComponentName': 'DatePicker',
                        'props': {
                            'placeholder': '天气晚来秋。',
                            'rows': 3,
                        },
                        'id': 'shwh0urbw4c'
                    },
                    {
                        'componentName': "Radio",
                        'configVisible': false,
                        'default': false,
                        'id': "gcw5obgdm2",
                        'isRequired': false,
                        'key': "status",
                        'label': "状态",
                        'props': {
                            'configList': [{ 'id': 1,'label':'启用','value':1 },{ 'id': 2,'label':'禁用','value':0 }],
                            'label':'状态',
                            'defaultValue':1
                        },
<<<<<<< HEAD
                        'source': "antd",
                        'stateName': "dateObj"
                    },
                    {
                        'componentName': "Radio",
                        'configVisible': false,
                        'default': false,
                        'id': "gcw5obgdm3",
                        'isRequired': false,
                        'key': "name",
                        'label': "姓名",
                        'props': {
                            'configList': [{ 'id': 1,'label':'崔云云','value':'cyy' },{ 'id': 2,'label':'曾威','value':'zw' }],
                            'label':'姓名',
                            'defaultValue':'cyy'
                        },
                        'source': "antd",
                        'stateName': "dateObj"
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
=======
                        "id": "shwh0urbw4c"
                    },
                    {
                        "stateName": "datePic",
                        "componentName": "DatePicker",
                        "source": "antd",
                        "default": false,
                        "key": "publishTime",
                        "label": "发布时间",
                        "props": {
                            "format": "YYYY-MM-DD HH:mm:ss",
                            "showTime": {"format": "HH:mm"},
                            "placeholder": "发布时间"
                        },
                        "id": "dfcsa5db2ee"
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
>>>>>>> feature_datePicker
                    }
                ]
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
                            'title': '操作',
                            'component': {
                                'componentName': 'a', // 组件名称
                                'text': '跳转',
                                'type': 'link',
                                'href': 'http://www.baidu.com',
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