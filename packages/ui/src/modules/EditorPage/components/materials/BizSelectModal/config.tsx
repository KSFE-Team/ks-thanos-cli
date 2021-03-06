import React from 'react';
import { Form, Input, Select, Radio } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import Card from 'Src/components/Card';
import { ALIAS, FIELD_DICT, ISREQUIRED_TYPE, DEFAULT_OPTIONS } from '../../../utils/constants';

const FormItem = Form.Item;
const { Option } = Select;

interface BizSelectModalProps extends ComponentConfig {}

export default (props: BizSelectModalProps) => {
    const { id, undoStack } = props;
    const config = props[id] || {};
    const children = DEFAULT_OPTIONS.map(({ value, name }, index) => {
        return <Option key={index} value={value}>{`${name}(${value})`}</Option>;
    });
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
                        componentName: 'BizSelectModal',
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
                    <Form.Item name={FIELD_DICT.LABEL} label={ALIAS.LABEL} required>
                        <Input placeholder="例如：专辑" />
                    </Form.Item>
                    <FormItem name={FIELD_DICT.KEY} label={ALIAS.KEY} required>
                        <Input placeholder="例如： contentId" />
                    </FormItem>
                    <Form.Item name={FIELD_DICT.TYPE} label={ALIAS.TYPE} required>
                        <Select
                            placeholder="请选择"
                            style={{ width: '100%' }}
                            showSearch
                            filterOption={(input, option: any) =>
                                String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {children}
                        </Select>
                    </Form.Item>
                    <Form.Item name={FIELD_DICT.ISREQUIRED} label={ALIAS.ISREQUIRED} required>
                        <Radio.Group>
                            {ISREQUIRED_TYPE.map(({ VALUE, LABEL }, index) => (
                                <Radio key={index} value={VALUE}>
                                    {LABEL}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                </Card>
            </Form>
        </div>
    );
};
