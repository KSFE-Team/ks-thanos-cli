import React from 'react';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { actions } from 'kredux';
import { useSelector } from 'react-redux';
import { getFragments } from './utils';

const FormItem = Form.Item;
const { Option } = Select;
interface ExtendOptions {
    labelText: string;
    valueText: string;
    config: any;
    id: string;
}

export default (props: ExtendOptions) => {
    const { page, sotres } = useSelector((store: any) => ({ page: store.page, sotres: store }));
    const { labelText, valueText, config, id } = props;
    const fragment = getFragments(page.pageJson.components, sotres) || [];
    const childrens = fragment.map(({ name, id }, index) => {
        return (
            <Option value={id} key={index}>
                {name}
            </Option>
        );
    });
    let isLabel: boolean = true;
    if (config.options && config.options.length > 0) {
        const { options } = config;
        isLabel = Object.keys(options[0]).includes('label');
    }
    return (
        <div className="config-table">
            <Row justify="space-around" style={{ marginBottom: '4px' }}>
                <Col span={6}>{labelText}</Col>
                <Col span={6}>{valueText}</Col>
                <Col span={6}>区域块</Col>
            </Row>
            <Form.List name="options">
                {(fields, { add, remove, move }) => {
                    return (
                        <div>
                            {fields.map((field, index) => (
                                <Row key={field.key} justify="space-around">
                                    <Col span={6}>
                                        <FormItem
                                            {...field}
                                            name={[field.name, isLabel ? 'label' : 'text']}
                                            fieldKey={[field.fieldKey, 'label']}
                                        >
                                            <Input placeholder="label" />
                                        </FormItem>
                                    </Col>
                                    <Col span={6}>
                                        <FormItem
                                            {...field}
                                            name={[field.name, 'value']}
                                            fieldKey={[field.fieldKey, 'value']}
                                        >
                                            <Input placeholder="value" />
                                        </FormItem>
                                    </Col>
                                    <Col span={6}>
                                        <FormItem
                                            {...field}
                                            name={[field.name, 'fragmentId']}
                                            fieldKey={[field.fieldKey, 'fragmentId']}
                                        >
                                            <Select>{childrens}</Select>
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
