import React from 'react';
import { Form, Input } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
};
const LABEL = 'label';
const KEY = 'key';
const SORT_KEY = 'sortKey';
const ADD_BUTTON_TEXT = 'addButtonText';

interface ExtendContainerConfigProps extends ComponentConfig {}

export default (props: ExtendContainerConfigProps) => {
    const { id } = props;
    const config = props[id] || {};

    return (
        <div>
            <Form
                layout="vertical"
                onValuesChange={(_, allFields) => {
                    actions[id].setReducers(allFields);
                }}
                fields={Object.keys(config).map((key) => ({
                    name: [key],
                    value: config[key],
                }))}
            >
                <FormItem label="label" name={LABEL} {...formItemLayout} required>
                    <Input placeholder="例如： 故事列表" />
                </FormItem>
                <FormItem label="key" name={KEY} {...formItemLayout} required>
                    <Input placeholder="例如： storyList" />
                </FormItem>
                <FormItem label="排序key" name={SORT_KEY} {...formItemLayout} required>
                    <Input placeholder="例如： __keys" />
                </FormItem>
                <FormItem label="按钮文案" name={ADD_BUTTON_TEXT} {...formItemLayout} required>
                    <Input placeholder="例如： 添加" />
                </FormItem>
            </Form>
        </div>
    );
};
