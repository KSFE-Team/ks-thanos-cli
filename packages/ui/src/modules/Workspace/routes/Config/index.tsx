import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { actions } from 'kredux';
import { Form, Input, Button, Spin } from 'antd';
import FormItemRender from 'Src/components/FormItemRender';
// import { requiredMessage } from 'Src/utils';
// import Guide from './Guide';
import { useSelector } from 'react-redux';
import './style.scss';

/**
 * 表单配置
 */
const FORM_ITEM_CONFIGS = [
    {
        title: '项目类型',
        key: 'type',
        component: <Input placeholder="项目类型" />,
        config: {
            rules: [
                // {required: true, message: requiredMessage('页面模版名称')}
            ],
        },
    },
    {
        title: '前端服务端口',
        key: 'port',
        component: <Input placeholder="前端服务端口" />,
        config: {
            rules: [
                // {required: true, message: requiredMessage('模块英文名称')}
            ],
        },
    },
    {
        title: 'nginx端口',
        key: 'nginxPort',
        component: <Input placeholder="nginx端口" />,
        config: {
            rules: [
                // {required: true, message: requiredMessage('模块英文名称')}
            ],
        },
    },
    {
        title: '项目访问地址',
        key: 'openUrl',
        component: <Input placeholder="项目启动打开地址" />,
        config: {
            rules: [
                // {required: true, message: requiredMessage('模块中文名称')}
            ],
        },
    },
    {
        title: '公共路径',
        key: 'publicPath',
        component: <Input placeholder="公共路径" />,
        config: {
            rules: [
                // {required: true, message: requiredMessage('模块中文名称')}
            ],
        },
    },
];

export default () => {
    const [form] = Form.useForm();
    const { projectConfig } = useSelector(({ project }: any) => project);
    useEffect(() => {
        actions.project.getProjectConfig();
    }, []);

    const content = !Object.keys(projectConfig).length ? (
        <div className="thanos-config-form-loading">
            <Spin />
            <div>文件读取中</div>
        </div>
    ) : (
        <Form
            form={form}
            initialValues={projectConfig}
            onFinish={(values) => {
                // console.log('value', values);
            }}
        >
            <FormItemRender form={Form} configs={FORM_ITEM_CONFIGS} />
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    保存
                </Button>
            </Form.Item>
        </Form>
    );
    return (
        <div className="thanos-config">
            {/* <div className={'thanos-config-nav'}>
                <Guide />
            </div> */}
            <div className="thanos-config-form">{content}</div>
        </div>
    );
};
