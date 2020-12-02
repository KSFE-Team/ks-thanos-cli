import React from 'react';
import { Form, Input } from 'antd';
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
const NAME = 'fragmentName';

interface FragmentConfigProps extends ComponentConfig {}

export default (props: FragmentConfigProps) => {
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
                        componentName: 'Fragment',
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
                    <FormItem label="区域块名称" name={NAME} {...formItemLayout}>
                        <Input placeholder="例如： fragmentName" />
                    </FormItem>
                    <div style={{ marginTop: '15px', color: '#ee6d30d9' }}>
                        使用场景：多用于与Radio 或者 Checkbox 中的某个值做关联控制表单配置项
                    </div>
                </Card>
            </Form>
        </div>
    );
};
