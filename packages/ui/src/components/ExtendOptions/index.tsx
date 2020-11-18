import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { actions } from 'kredux';

const FormItem = Form.Item;

interface ExtendOptions {
    labelText: string;
    valueText: string;
    config: any;
    id: string;
}

export default (props: ExtendOptions) => {
    const { labelText, valueText, config, id } = props;
    let isLabel: boolean = true;
    if (config.options && config.options.length > 0) {
        const { options } = config;
        isLabel = Object.keys(options[0]).includes('label');
    }
    return (
        <div className="config-table">
            <Row justify="space-around" style={{ marginBottom: '4px' }}>
                <Col span={10}>{labelText}</Col>
                <Col span={10}>{valueText}</Col>
            </Row>
            <Form.List name="options">
                {(fields, { add, remove, move }) => {
                    return (
                        <div>
                            {fields.map((field, index) => (
                                <Row key={field.key} justify="space-around">
                                    <Col span={10}>
                                        <FormItem
                                            {...field}
                                            name={[field.name, isLabel ? 'label' : 'text']}
                                            fieldKey={[field.fieldKey, 'label']}
                                        >
                                            <Input placeholder="label" />
                                        </FormItem>
                                    </Col>
                                    <Col span={10}>
                                        <FormItem
                                            {...field}
                                            name={[field.name, 'value']}
                                            fieldKey={[field.fieldKey, 'value']}
                                        >
                                            <Input placeholder="value" />
                                        </FormItem>
                                    </Col>
                                    {fields.length > 1 && (
                                        <Col
                                            flex="none"
                                            span={2}
                                            style={{
                                                lineHeight: '32px',
                                            }}
                                        >
                                            <MinusCircleOutlined
                                                style={{
                                                    color: '#f50',
                                                }}
                                                onClick={() => {
                                                    remove(field.name);
                                                    const newOptions = config.options;
                                                    newOptions.splice(index, 1);
                                                    actions[id].setReducers({
                                                        ...config,
                                                        options: newOptions,
                                                    });
                                                }}
                                            />
                                        </Col>
                                    )}
                                </Row>
                            ))}
                            <FormItem>
                                <Button
                                    type="dashed"
                                    icon={<PlusOutlined />}
                                    onClick={() => {
                                        add({ label: '', value: '' });
                                    }}
                                    style={{ width: '100%' }}
                                >
                                    添加
                                </Button>
                            </FormItem>
                        </div>
                    );
                }}
            </Form.List>
        </div>
    );
};
