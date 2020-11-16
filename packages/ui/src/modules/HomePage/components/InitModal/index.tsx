import React from 'react';
import { actions } from 'kredux';
import { Modal, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import FormItemRender, { Config } from 'Src/components/FormItemRender';
import { requiredMessage } from 'Src/utils';
import SelectPathInput from 'Src/components/SelectPathInput';
// import '../index.scss';

/**
 * 表单配置
 */
const FORM_ITEM_CONFIGS: Config[] = [
    {
        title: '项目名称',
        key: 'projectName',
        component: <Input placeholder="项目名称" />,
        config: {
            rules: [{ required: true, message: requiredMessage('项目名称') }],
        },
    },
    {
        title: '项目路径',
        key: 'projectPath',
        component: <SelectPathInput />,
        config: {
            rules: [{ required: true, message: requiredMessage('项目路径') }],
        },
    },
];

/**
 * 灭霸配置弹窗
 */
export default () => {
    const { homepage } = useSelector((store: any) => ({
        global: store.global,
        homepage: store.homepage,
    }));
    const { initModalVisible } = homepage;
    const [form] = Form.useForm();
    /**
     * 校验方法
     */
    const handleSubmit = () => {
        form.validateFields().then((values) => {
            actions.homepage.initProject({
                cwd: values.projectPath,
                cmd: 'init',
                args: JSON.stringify([
                    {
                        key: '--config',
                        value: { ...values },
                    },
                ]),
            });
        });
    };
    return (
        <Modal
            visible={initModalVisible}
            title="项目初始化"
            onCancel={() => {
                actions.homepage.setReducers({
                    initModalVisible: false,
                });
            }}
            onOk={handleSubmit}
        >
            <Form form={form}>
                <FormItemRender form={Form} configs={FORM_ITEM_CONFIGS} />
            </Form>
        </Modal>
    );
};
