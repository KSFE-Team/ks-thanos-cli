import React from 'react';
import { Form, Input, Radio, Button, Row, Col } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Card from 'Src/components/Card';
import { ISREQUIRED_TYPE, ALIAS, FIELD_DICT, BOOLEAN_TYPE } from '../../../utils/constants';

const FormItem = Form.Item;

const selectProps = [
    {
        name: 'allowClear',
        label: '允许清空',
    },
    {
        name: 'disabled',
        label: '是否禁用',
    },
    {
        name: 'showSearch',
        label: '展示搜索',
    },
];
interface SelectConfigProps extends ComponentConfig {}

export default (props: SelectConfigProps) => {
    const { id } = props;
    const config = props[id] || {};
    return (
        <div>
            <Form
                layout="vertical"
                onValuesChange={(_, allFields) => {
                    actions[id].setReducers(allFields);
                }}
                fields={Object.keys(config).map((key) => {
                    return {
                        name: [key],
                        value: config[key],
                    };
                })}
            >
                <Card title="基础配置" style={{ background: '#1d1c2a' }}>
                    <FormItem name={FIELD_DICT.LABEL} label={ALIAS.LABEL} required>
                        <Input placeholder="例如： 姓名" />
                    </FormItem>
                    <FormItem name={FIELD_DICT.KEY} label={ALIAS.KEY} required>
                        <Input placeholder="例如： name" />
                    </FormItem>
                    <FormItem name={FIELD_DICT.ISREQUIRED} label={ALIAS.ISREQUIRED} required>
                        <Radio.Group>
                            {ISREQUIRED_TYPE.map(({ VALUE, LABEL: label }, index) => (
                                <Radio key={index} value={VALUE}>
                                    {label}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </FormItem>
                </Card>
                <Card title="Select Props 配置" style={{ background: '#1d1c2a', marginTop: '4px' }}>
                    {selectProps.map(({ name, label }) => {
                        return (
                            <FormItem name={name} label={label} key={name}>
                                <Radio.Group>
                                    {BOOLEAN_TYPE.map(({ VALUE, LABEL }, index) => (
                                        <Radio value={VALUE} key={index}>
                                            {LABEL}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            </FormItem>
                        );
                    })}
                </Card>
                <Card title="Option 配置" style={{ background: '#1d1c2a', marginTop: '4px' }}>
                    <Row justify="space-around" style={{ marginBottom: '4px' }}>
                        <Col span={10}>选项名称</Col>
                        <Col span={10}>选项值</Col>
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
                                                    name={[field.name, 'label']}
                                                    fieldKey={[field.fieldKey, 'label']}
                                                    // rules={[{ required: true, message: 'Missing first name' }]}
                                                >
                                                    <Input placeholder="label" />
                                                </FormItem>
                                            </Col>
                                            <Col span={10}>
                                                <FormItem
                                                    {...field}
                                                    name={[field.name, 'value']}
                                                    fieldKey={[field.fieldKey, 'value']}
                                                    // rules={rules}
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
                </Card>
            </Form>
        </div>
    );
};
