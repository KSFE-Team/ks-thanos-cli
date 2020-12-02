import React from 'react';
import { Form, Select } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import Card from 'Src/components/Card';

const { Option } = Select;
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
const TYPE = 'type';
const JUSTIFY = 'justify';
const ALIGN = 'align';
const JUSTIFY_TYPE = [
    { LABEL: 'start', VALUE: 'start' },
    { LABEL: 'end', VALUE: 'end' },
    { LABEL: 'center', VALUE: 'center' },
    { LABEL: 'space-around', VALUE: 'space-around' },
    { LABEL: 'space-between', VALUE: 'space-between' },
];
const ALIGN_TYPE = [
    { LABEL: 'top', VALUE: 'top' },
    { LABEL: 'middle', VALUE: 'middle' },
    { LABEL: 'bottom', VALUE: 'bottom' },
];

interface RowConfigProps extends ComponentConfig {}

export default (props: RowConfigProps) => {
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
                        componentName: 'Row',
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
                    <FormItem label="type" name={TYPE} {...formItemLayout}>
                        <Select placeholder="type" allowClear>
                            <Option value="flex">flex</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="justify" name={JUSTIFY} {...formItemLayout}>
                        <Select placeholder="justify" allowClear>
                            {JUSTIFY_TYPE.map(({ VALUE, LABEL }) => (
                                <Option value={VALUE}>{LABEL}</Option>
                            ))}
                        </Select>
                    </FormItem>
                    <FormItem label="align" name={ALIGN} {...formItemLayout}>
                        <Select placeholder="align" allowClear>
                            {ALIGN_TYPE.map(({ VALUE, LABEL }) => (
                                <Option value={VALUE}>{LABEL}</Option>
                            ))}
                        </Select>
                    </FormItem>
                </Card>
            </Form>
        </div>
    );
};
