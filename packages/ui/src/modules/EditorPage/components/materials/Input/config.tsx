import React from 'react';
import { Form, Input, Radio } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
// import { ALIAS, FORMITEM_LAYOUT, FORM_MESSAGE, ISREQUIRED_TYPE } from 'Src/utils/constants';
import { ISREQUIRED_TYPE, ALIAS } from '../../../utils/constants';
// import { findComponent, saveComponent } from 'Src/utils';
// import { checkFieldData } from 'Src/utils/utils';
// import ClearButton from 'Src/components/ClearButton';

const FormItem = Form.Item;
const KEY = 'key';
const LABEL = 'label';
const ISREQUIRED = 'isRequired';

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
                <FormItem name={LABEL} label={ALIAS.LABEL} required>
                    <Input placeholder="例如： 姓名" />
                </FormItem>
                <FormItem name={KEY} label={ALIAS.KEY} required>
                    <Input placeholder="例如： name" />
                </FormItem>
                {/* 是否必填/选 */}
                <Form.Item name={ISREQUIRED} label={ALIAS.ISREQUIRED} required>
                    <Radio.Group>
                        {ISREQUIRED_TYPE.map(({ VALUE, LABEL: label }, index) => (
                            <Radio key={index} value={VALUE}>
                                {label}
                            </Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>
            </Form>
        </div>
    );
};
