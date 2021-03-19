import React from 'react';
import { actions } from 'kredux';
import { useSelector } from 'react-redux';
import { Modal, Form, Input, message, Radio } from 'antd';
import FormItemRender, { Config } from 'Src/components/FormItemRender';
import { requiredMessage, getObjectStorage } from 'Src/utils';
import SelectPathInput from 'Src/components/SelectPathInput';
import SelectTemplateInput from 'Src/components/SelectTemplateInput';

const audioUrl =
    'https://cdn.kaishuhezi.com/kstory/activity_flow/audio/hub/compress/b01d0d15-b31d-420e-9657-02e9e93e71eb_info_t=0_s=5888.mp3';

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
    {
        title: '是否合并model',
        key: 'isCombine',
        component: (
            <Radio.Group>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
            </Radio.Group>
        ),
        config: {
            rules: [{ required: true, message: requiredMessage('namespace') }],
            initialValue: 0,
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
            const { templateName, pageChineseName, pagePath } = fieldsValue;
            const projectName = getObjectStorage('currentProject').name;
            const pageRealPath = `${pagePath.split(projectName)[1]}/${templateName}/index.js`;
            console.log(pagePath, projectName, pagePath.split(projectName), pageRealPath);
            actions.workspace.thanosSync({
                cwd,
                cmd: 'sync',
                args: JSON.stringify([
                    {
                        key: '--config',
                        value: { ...fieldsValue },
                    },
                ]),
                callback: () => {
                    message.success('灭霸打响指了');
                    const postData = {
                        projectName,
                        templateName,
                        pageChineseName,
                        pagePath: pageRealPath,
                        pageName: 'index.js',
                        status: 0,
                    };
                    // actions.thanoslog.createLog(postData);
                    actions.workspace.setReducers({
                        thanosModalVisible: false,
                        // thanosGeneratorLoading: true
                    });
                    actions.workspace.handleAudioPlay({
                        audioUrl,
                    });
                },
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
