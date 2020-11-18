import React from 'react';
import { Form, Input, Select, Radio } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import Card from 'Src/components/Card';
import { ALIAS, FIELD_DICT, ISREQUIRED_TYPE, DEFAULT_OPTIONS } from '../../../utils/constants';

const FormItem = Form.Item;
const { Option } = Select;

interface BizSelectTagsProps extends ComponentConfig {}

export default (props: BizSelectTagsProps) => {
    const { id } = props;
    const config = props[id] || {};
    const children = DEFAULT_OPTIONS.map(({ value, name }: any, index: string | number | undefined) => {
        return <Option key={index} value={value}>{`${name}(${value})`}</Option>;
    });
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
                <Card title="基础配置">
                    <Form.Item name={FIELD_DICT.LABEL} label={ALIAS.LABEL} required>
                        <Input placeholder="例如：故事" />
                    </Form.Item>
                    <FormItem name={FIELD_DICT.KEY} label={ALIAS.KEY} required>
                        <Input placeholder="例如： story" />
                    </FormItem>
                    <Form.Item name={FIELD_DICT.TYPE} label={ALIAS.TYPE} required>
                        <Select
                            placeholder="请选择"
                            style={{ width: '100%' }}
                            showSearch
                            filterOption={(input, option: any) => {
                                return (
                                    option.value.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) > -1
                                );
                            }}
                        >
                            {children}
                        </Select>
                    </Form.Item>
                    <Form.Item name="showTagKey" label="tag展示字段" required>
                        <Input placeholder="例如：name" />
                    </Form.Item>
                    <FormItem name="buttonText" label="添加按钮文案" required>
                        <Input placeholder="例如： 添加一个" />
                    </FormItem>
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
