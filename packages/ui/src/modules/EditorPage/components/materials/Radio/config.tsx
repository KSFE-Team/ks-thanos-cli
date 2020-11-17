import React from 'react';
import { Form, Input, Radio } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import Card from 'Src/components/Card';
import ExtendOptions from 'Src/components/ExtendOptions';
import { ISREQUIRED_TYPE, ALIAS, FIELD_DICT } from '../../../utils/constants';

const FormItem = Form.Item;

interface InputConfigProps extends ComponentConfig {}

export default (props: InputConfigProps) => {
    const { id } = props;
    const config = props[id] || {};
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
                    <FormItem name={FIELD_DICT.LABEL} label={ALIAS.LABEL} required>
                        <Input placeholder="例如： 状态" />
                    </FormItem>
                    <FormItem name={FIELD_DICT.KEY} label={ALIAS.KEY} required>
                        <Input placeholder="例如： status" />
                    </FormItem>
                    <Form.Item name={FIELD_DICT.ISREQUIRED} label={ALIAS.ISREQUIRED} required>
                        <Radio.Group>
                            {ISREQUIRED_TYPE.map(({ VALUE, LABEL: label }, index) => (
                                <Radio key={index} value={VALUE}>
                                    {label}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                </Card>
                <Card title="Option 配置">
                    <ExtendOptions labelText="选项名称" valueText="选项值" config={config} id={id} />
                </Card>
            </Form>
        </div>
    );
};
