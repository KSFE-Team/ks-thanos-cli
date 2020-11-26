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
const NAME = 'title';

interface KSWhiteCardConfigProps extends ComponentConfig {}

export default (props: KSWhiteCardConfigProps) => {
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
                <FormItem label="卡片title" name={NAME} {...formItemLayout} required>
                    <Input placeholder="例如： 分类表单" />
                </FormItem>
            </Form>
        </div>
    );
};
