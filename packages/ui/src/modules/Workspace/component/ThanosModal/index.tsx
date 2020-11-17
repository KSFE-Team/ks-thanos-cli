import React from 'react';
import { actions } from 'kredux';
import { useSelector } from 'react-redux';
import { Modal, Form, Input } from 'antd';
import FormItemRender, { Config } from 'Src/components/FormItemRender';
import { requiredMessage } from 'Src/utils';
import SelectPathInput from 'Src/components/SelectPathInput';
import SelectTemplateInput from 'Src/components/SelectTemplateInput';

/**
 * 表单配置
 */
const FORM_ITEM_CONFIGS: Config[] = [
    {
        title: '页面模版名称',
        key: 'templateName',
        component: <SelectTemplateInput />,
        config: {
            rules: [{ required: true, message: requiredMessage('页面模版名称') }],
        },
    },
    {
        title: '模块英文名称',
        key: 'pageName',
        component: <Input placeholder="模块英文名称" />,
        config: {
            rules: [{ required: true, message: requiredMessage('模块英文名称') }],
        },
    },
    {
        title: '模块中文名称',
        key: 'pageChineseName',
        component: <Input placeholder="模块中文名称" />,
        config: {
            rules: [{ required: true, message: requiredMessage('模块中文名称') }],
        },
    },
    {
        title: '页面路径',
        key: 'pagePath',
        component: <SelectPathInput />,
        config: {
            rules: [{ required: true, message: requiredMessage('页面路径') }],
            initialValue: '',
            extra: '（相对于 src/pages 的路径）',
        },
    },
];

/**
 * 灭霸配置弹窗
 */
export default () => {
    const { workspace, loading } = useSelector((store: any) => ({
        workspace: store.workspace,
        loading: store.loading.effects['workspace/thanosSync'],
    }));
    // thanosLoading
    const { thanosModalVisible, initPageName, cwd } = workspace;
    const [form] = Form.useForm();
    const initialValues = {
        templateName: initPageName,
    };
    /**
     * 校验方法
     */
    const handleSubmit = () => {
        form.validateFields().then((fieldsValue) => {
            actions.workspace.thanosSync({
                cwd,
                cmd: 'sync',
                args: JSON.stringify([
                    {
                        key: '--config',
                        value: { ...fieldsValue },
                    },
                ]),
            });
        });
    };
    return (
        <Modal
            visible={thanosModalVisible}
            title="灭霸配置"
            confirmLoading={loading}
            onCancel={() => {
                actions.workspace.setReducers({
                    thanosModalVisible: false,
                });
            }}
            onOk={handleSubmit}
        >
            <Form form={form} initialValues={initialValues}>
                <FormItemRender form={Form} configs={FORM_ITEM_CONFIGS} />
            </Form>
        </Modal>
    );
};
