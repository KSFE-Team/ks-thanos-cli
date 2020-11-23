import React from 'react';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { actions } from 'kredux';
import { DATA_TYPE } from '../constants';

const FormItem = Form.Item;
const { Option } = Select;

interface ColumnsConfig {
    config: any;
    id: string;
}

const columns = [
    {
        title: '名称',
        key: 'title',
    },
    {
        title: '字段',
        key: 'dataIndex',
    },
    {
        title: '列宽',
        key: 'width',
        placeholder: '175',
    },
    {
        title: '类型',
        key: 'dataType',
        component: (
            <Select placeholder="数据类型">
                {DATA_TYPE.map(({ LABEL, VALUE }) => {
                    return (
                        <Option value={VALUE} key={VALUE}>
                            {LABEL}
                        </Option>
                    );
                })}
            </Select>
        ),
    },
];

export default (props: ColumnsConfig) => {
    const { config, id } = props;
    return (
        <div className="config-table">
            <Row justify="space-around" style={{ marginBottom: '4px' }}>
                {columns.map(({ title }) => {
                    return (
                        <Col key={title} span={5}>
                            {title}
                        </Col>
                    );
                })}
            </Row>
            <Form.List name="columns">
                {(fields, { add, remove }) => {
                    return (
                        <div>
                            {fields.map((field, index) => (
                                <Row key={field.key} justify="space-around">
                                    {columns.map(({ title, key, component, placeholder }) => {
                                        return (
                                            <Col key={key} span={5}>
                                                <FormItem
                                                    {...field}
                                                    name={[field.name, key]}
                                                    fieldKey={[field.fieldKey, key]}
                                                >
                                                    {component || <Input placeholder={placeholder || title} />}
                                                </FormItem>
                                            </Col>
                                        );
                                    })}
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
                                                    const newColumns = config.columns;
                                                    newColumns.splice(index, 1);
                                                    actions[id].setReducers({
                                                        ...config,
                                                        columns: newColumns,
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
                                        add({ title: '', dataIndex: '' });
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
