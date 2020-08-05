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
        initModalVisible: bool
    });
};

/**
 * 表单配置
 */
const FORM_ITEM_CONFIGS = [
    {
        title: '项目名称',
        key: 'projectName',
        component: <Input placeholder={'项目名称'}/>,
        config: {
            rules: [
                {required: true, message: requiredMessage('项目名称')}
            ]
        }
    },
    {
        title: '项目路径',
        key: 'pagePath',
        component: <SelectPathInput />,
        config: {
            rules: [
                {required: true, message: requiredMessage('项目路径')}
            ]
        }
    }
];

/**
 * 灭霸配置弹窗
 */
const initModal = (props) => {
    const { form, project, thanosLoading } = props;
    const { initModalVisible, currentPath } = project;
    /**
     * 校验方法
     */
    const handleSubmit = () => {
        form.validateFieldsAndScroll({force: true}, (err, fieldsValue) => {
            if (!err) {
                // actions.project.thanos();
                console.log({
                    ...fieldsValue,
                    cwd: currentPath
                });
            }
        });
    };
    return (
        <Modal
            visible={initModalVisible}
            title={'项目初始化'}
            confirmLoading={thanosLoading}
            onCancel={toogleModalVisible.bind(this, false)}
            onOk={handleSubmit}
        >
            {FormItemRender(form, FORM_ITEM_CONFIGS)}
        </Modal>
    );
};
initModal.propTypes = {
    project: PropTypes.object, // project redux
    form: PropTypes.object, // form表单
    thanosLoading: PropTypes.bool, // 接口状态
};

export default projectContainer(Form.create()(initModal));
