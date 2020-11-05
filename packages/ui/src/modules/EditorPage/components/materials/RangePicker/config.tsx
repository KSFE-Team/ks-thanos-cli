import React from 'react';
import { Form, Input, Radio, message } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import { ISREQUIRED_TYPE, ALIAS, FIELD_DICT } from '../../../utils/constants';

const FormItem = Form.Item;
const PLACEHOLDER = 'placeholder';

interface RangePickerConfigProps extends ComponentConfig {}

export default (props: RangePickerConfigProps) => {
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
                <Form.Item name={FIELD_DICT.LABEL} label={ALIAS.LABEL} required>
                    <Input placeholder="例如：时间区间 " />
                </Form.Item>
                <FormItem name={FIELD_DICT.KEY} label={ALIAS.KEY} required>
                    <Input placeholder="例如： startTime" />
                </FormItem>
                <FormItem
                    name={PLACEHOLDER}
                    label={ALIAS.PLACEHOLDER}
                    validateTrigger={['onBlur']}
                    rules={[
                        { pattern: /^[\u4e00-\u9fa5]+\/{1}[\u4e00-\u9fa5]+$/, message: '请输入汉字且用“/”进行分割！' },
                    ]}
                >
                    <Input placeholder="例如： 开始时间/截止时间" />
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
            </Form>
        </div>
    );
};
