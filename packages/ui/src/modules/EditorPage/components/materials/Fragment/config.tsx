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
const NAME = 'fragmentName';

interface FragmentConfigProps extends ComponentConfig {}

export default (props: FragmentConfigProps) => {
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
                <div style={{ marginBottom: '15px', color: '#ee6d30d9' }}>
                    使用场景：多用于与Radio 或者 Checkbox 中的某个值做关联控制表单配置项
                </div>
                <FormItem label="区域块名称" name={NAME} {...formItemLayout}>
                    <Input placeholder="例如： fragmentName" />
                </FormItem>
            </Form>
        </div>
    );
};
