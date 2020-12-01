import React from 'react';
import { Form, Input, Radio } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import Card from 'Src/components/Card';
import ExtendOptions from 'Src/components/ExtendOptions';
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
                        componentName: 'Select',
                    };
                    undoStack.push(undoItem);
                    actions.page.setReducers({
                        undoStack,
                    });
                }}
                fields={Object.keys(config).map((key) => {
                    return {
                        name: [key],
                        value: config[key],
                    };
                })}
            >
                <Card title="基础配置">
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
                <Card title="Select Props 配置">
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
                <Card title="Option 配置">
                    <ExtendOptions labelText="选项名称" valueText="选项值" config={config} id={id} />
                </Card>
            </Form>
        </div>
    );
};
