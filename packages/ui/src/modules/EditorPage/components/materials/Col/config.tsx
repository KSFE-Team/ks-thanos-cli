import React from 'react';
import { Form, InputNumber } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import Card from 'Src/components/Card';

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
const SPAN = 'span';

interface ColConfigProps extends ComponentConfig {}

export default (props: ColConfigProps) => {
    const { id, undoStack } = props;
    const config = props[id] || {};

    return (
        <div>
            <Form
                layout="vertical"
                onValuesChange={(_, allFields) => {
                    actions[id].setReducers(allFields);
                }}
                onBlur={() => {
                    const copyConfig = JSON.parse(JSON.stringify(config));
                    const undoItem = {
                        type: 'property',
                        formConfig: copyConfig,
                        id,
                        componentName: 'Col',
                    };
                    undoStack.push(undoItem);
                    actions.page.setReducers({
                        undoStack,
                    });
                }}
                fields={Object.keys(config).map((key) => ({
                    name: [key],
                    value: config[key],
                }))}
            >
                <Card title={config.componentName}>
                    <FormItem label="span值" name={SPAN} {...formItemLayout} required>
                        <InputNumber style={{ width: '100%' }} placeholder="span值" min={1} max={24} />
                    </FormItem>
                </Card>
            </Form>
        </div>
    );
};
