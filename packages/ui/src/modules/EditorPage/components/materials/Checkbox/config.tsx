import React from 'react';
import { Form, Input, Radio } from 'antd';
// import { CloseCircleOutlined } from '@ant-design/icons';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
// import ConfigTable from 'Src/components/ConfigTable';
import ExtendOptions from 'Src/components/ExtendOptions';
import Card from 'Src/components/Card';
import { ISREQUIRED_TYPE, ALIAS, FIELD_DICT } from '../../../utils/constants';

const FormItem = Form.Item;

interface CheckboxConfigProps extends ComponentConfig {}

export default (props: CheckboxConfigProps) => {
    const { id, undoStack } = props;
    const config = props[id] || {};

    return (
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
                    componentName: 'Checkbox',
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
                <FormItem name={FIELD_DICT.LABEL} label={ALIAS.LABEL} required>
                    <Input placeholder="例如： 姓名" />
                </FormItem>
                <FormItem name={FIELD_DICT.KEY} label={ALIAS.KEY} required>
                    <Input placeholder="例如： name" />
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
    );
};
