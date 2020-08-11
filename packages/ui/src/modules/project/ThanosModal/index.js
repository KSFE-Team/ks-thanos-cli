import React from 'react';
import PropTypes from 'prop-types';
import { actions } from 'kredux';
import { Modal, Form, Input } from 'antd';
import FormItemRender from 'Components/FormItemRender';
import { projectContainer } from 'Models/project';
import { requiredMessage } from 'Utils';
import SelectPathInput from '../SelectPathInput';
import '../index.scss';

/**
 * 关闭弹框
 */
const toogleModalVisible = (bool) => {
    actions.project.setReducers({
        thanosModalVisible: bool
    });
};

/**
 * 表单配置
 */
const FORM_ITEM_CONFIGS = [
    {
        title: '页面模版名称',
        key: 'templateName',
        component: <Input placeholder={'页面模版名称'}/>,
        config: {
            rules: [
                {required: true, message: requiredMessage('页面模版名称')}
            ]
        }
    },
    {
        title: '创建模块英文名称',
        key: 'pageName',
        component: <Input placeholder={'创建模块英文名称'}/>,
        config: {
            rules: [
                {required: true, message: requiredMessage('创建模块英文名称')}
            ]
        }
    },
    {
        title: '创建模块中文名称',
        key: 'pageChineseName',
        component: <Input placeholder={'创建模块中文名称'}/>,
        config: {
            rules: [
                {required: true, message: requiredMessage('创建模块中文名称')}
            ]
        }
    },
    {
        title: '页面路径（相对于 src/pages 的路径）',
        key: 'pagePath',
        component: <SelectPathInput />,
        config: {
            rules: [
                // {required: true, message: requiredMessage('页面路径（相对于 src/pages 的路径）')}
            ],
            initialValue: ''
        }
    }
];

/**
 * 灭霸配置弹窗
 */
const thanosModal = (props) => {
    const { form, project, thanosLoading } = props;
    const { thanosModalVisible, cwd } = project;
    /**
     * 校验方法
     */
    const handleSubmit = () => {
        form.validateFieldsAndScroll({force: true}, (err, fieldsValue) => {
            if (!err) {
                actions.project.thanosSync({
                    cwd,
                    cmd: 'sync',
                    args: JSON.stringify([
                        {
                            key: '--config',
                            value: {...fieldsValue}
                        }
                    ])
                });
            }
        });
    };
    return (
        <Modal
            visible={thanosModalVisible}
            title={'灭霸配置'}
            confirmLoading={thanosLoading}
            onCancel={toogleModalVisible.bind(this, false)}
            onOk={handleSubmit}
        >
            {FormItemRender(form, FORM_ITEM_CONFIGS)}
        </Modal>
    );
};
thanosModal.propTypes = {
    project: PropTypes.object, // project redux
    form: PropTypes.object, // form表单
    thanosLoading: PropTypes.bool, // 接口状态
};

export default projectContainer(Form.create()(thanosModal));
