import React from 'react';
import { Form, Input, Radio } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import Card from 'Src/components/Card';
import { ISREQUIRED_TYPE, ALIAS, FIELD_DICT } from '../../../utils/constants';

const FormItem = Form.Item;
const PLACEHOLDER = 'placeholder';

interface TextAreaConfigProps extends ComponentConfig {}

export default (props: TextAreaConfigProps) => {
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
                        componentName: 'TextArea',
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
                        <Input placeholder="例如： 备注" />
                    </Form.Item>
                    <FormItem name={FIELD_DICT.KEY} label={ALIAS.KEY} required>
                        <Input placeholder="例如： name" />
                    </FormItem>
                    <FormItem name={PLACEHOLDER} label={ALIAS.PLACEHOLDER}>
                        <Input placeholder="例如： 请输入备注信息" />
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
