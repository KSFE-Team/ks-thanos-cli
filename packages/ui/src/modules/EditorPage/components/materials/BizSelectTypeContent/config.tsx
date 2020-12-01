import React from 'react';
import { Form, Input, Select, Radio } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import Card from 'Src/components/Card';
import { flagArr, FIELD } from './constants';
import { DEFAULT_OPTIONS } from '../BizSelectModal/utils';

const FormItem = Form.Item;
const { Option } = Select;

interface BizSelectTypeContentProps extends ComponentConfig {}

export default (props: BizSelectTypeContentProps) => {
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
                        componentName: 'BizSelectTypeContent',
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
                    <Form.Item name={FIELD.LABEL.key} label={FIELD.LABEL.name} required>
                        <Input placeholder="例如：内容类型" />
                    </Form.Item>
                    <FormItem name={FIELD.KEY.key} label={FIELD.KEY.name} required>
                        <Input placeholder="例如： type" />
                    </FormItem>
                    <Form.Item name={FIELD.CONTENT_ARR.key} label={FIELD.CONTENT_ARR.name} required>
                        <Select
                            mode="multiple"
                            placeholder="请选择"
                            style={{ width: '100%', color: '#000' }}
                            showSearch
                            filterOption={(input, option: any) =>
                                String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {DEFAULT_OPTIONS.map(({ value, name }, index) => {
                                return <Option key={index} value={value}>{`${name}(${value})`}</Option>;
                            })}
                        </Select>
                    </Form.Item>
                    <FormItem name={FIELD.CONTENT_KEY.key} label={FIELD.CONTENT_KEY.name} required>
                        <Input placeholder="例如：contnetId" />
                    </FormItem>
                    <Form.Item name={FIELD.ALIAS_ARRY.key} label={FIELD.ALIAS_ARRY.name} required>
                        <Radio.Group>
                            {flagArr.map(({ value, label }, index) => (
                                <Radio key={index} value={value}>
                                    {label}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                </Card>
            </Form>
        </div>
    );
};
