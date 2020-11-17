import React, { useEffect } from 'react';
import { actions } from 'kredux';
import { Form, Input, Button, Spin, Modal } from 'antd';
import FormItemRender from 'Src/components/FormItemRender';
import { requiredMessage } from 'Src/utils';
import { useSelector } from 'react-redux';
import Guide from './Guide';
import ConfigCard from './ConfigCard';
import './style.scss';

const { confirm } = Modal;

/**
 * 表单配置
 */
const FORM_ITEM_CONFIGS = [
    {
        title: '项目类型',
        key: 'type',
        component: <Input placeholder="项目类型" />,
        desc: '前端项目类型，KMS项目一般使用 “cms”。',
        config: {
            rules: [{ required: true, message: requiredMessage('项目类型') }],
        },
    },
    {
        title: '前端服务端口',
        key: 'port',
        component: <Input placeholder="前端服务端口" />,
        desc: '前端服务运行的端口号，一般不用此端口直接访问',
        config: {
            rules: [{ required: true, message: requiredMessage('前端服务端口') }],
        },
    },
    {
        title: 'nginx端口',
        key: 'nginxPort',
        component: <Input placeholder="nginx端口" />,
        desc: '本地nginx服务端口，nginx解决单点登陆、跨域请求等问题，KMS项目一般使用nginx服务端口访问项目',
        config: {
            rules: [{ required: true, message: requiredMessage('nginx端口') }],
        },
    },
    {
        title: '项目访问地址',
        key: 'openUrl',
        component: <Input placeholder="项目启动打开地址" />,
        desc: 'webpack在编译完成之后，自动打开的项目地址。一般为localhost + nginx端口',
        config: {
            rules: [{ required: true, message: requiredMessage('项目访问地址') }],
        },
    },
    {
        title: '公共路径',
        key: 'publicPath',
        component: <Input placeholder="公共路径" />,
        desc: '访问线上资源的相对路径，一般和项目名相同。如白圭项目： /baigui/',
        config: {
            rules: [{ required: true, message: requiredMessage('公共路径') }],
        },
    },
];

export default () => {
    const [form] = Form.useForm();
    const {
        workspace: { projectConfig },
        effectsLoading,
    } = useSelector(({ workspace, loading }: any) => ({ workspace, effectsLoading: loading.effects }));
    useEffect(() => {
        actions.workspace.getProjectConfig();
    }, []);

    const finishHandle = (values: any) => {
        confirm({
            title: '确认保存配置?',
            content: '保存配置后会立即更新配置文件，也会重启正在运行的项目，请慎重。',
            onOk: () => {
                actions.workspace.updateProjectConfig({
                    ...values,
                    form,
                });
            },
        });
    };

    const content = effectsLoading['workspace/getProjectConfig'] ? (
        <div className="thanos-config-form-loading">
            <Spin />
            <div>文件读取中</div>
        </div>
    ) : (
        <Form requiredMark={false} layout="vertical" form={form} initialValues={projectConfig} onFinish={finishHandle}>
            <Form.Item style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit" loading={effectsLoading['workspace/updateProjectConfig']}>
                    保存
                </Button>
                <Button
                    className="mar-l-4"
                    onClick={() => {
                        form.resetFields();
                    }}
                >
                    重置
                </Button>
            </Form.Item>
            <ConfigCard title="基础配置">
                <FormItemRender form={Form} configs={FORM_ITEM_CONFIGS} />
            </ConfigCard>
        </Form>
    );
    return (
        <div className="thanos-config">
            <div className="thanos-config-nav">
                <Guide />
            </div>
            <div className="thanos-config-form">{content}</div>
        </div>
    );
};
