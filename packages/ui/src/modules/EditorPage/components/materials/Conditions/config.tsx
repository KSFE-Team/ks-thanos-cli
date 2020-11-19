import React from 'react';
import { Form, Select } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import { ALIAS, FIELD_DICT } from '../../../utils/constants';
import { DEFAULT_OPTIONS } from './utils';

const FormItem = Form.Item;
const { Option } = Select;

interface ConditionsProps extends ComponentConfig {}

export default (props: ConditionsProps) => {
    const { id } = props;
    const config = props[id] || {};
    const children = DEFAULT_OPTIONS.map((option, index) => (
        <Option key={index} value={option.value}>
            {option.name}({option.value})
        </Option>
    ));
    console.log(props, config, 'props');
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
                <FormItem name={FIELD_DICT.TYPE} label={ALIAS.TYPE} required>
                    <Select
                        placeholder="请选择"
                        style={{ width: '100%' }}
                        showSearch
                        mode="tags"
                        // filterOption={(input, option) =>
                        //     String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                        // }
                    >
                        {children}
                    </Select>
                </FormItem>
                {/* {formfields.length > 0 &&
                    formfields.map((item, index) => {
                        const optionObj = DEFAULT_OPTIONS.find(({ value }) => value === item.key) || { name: '' };
                        return (
                            <div key={index} style={{ display: 'flex' }}>
                                <FormItem label="类型" style={{ marginRight: '15px' }}>
                                    <p>{optionObj.name}</p>
                                </FormItem>
                                <FormItem label="是否必填" style={{ marginRight: '15px' }}>
                                    <Radio.Group
                                        value={item.isRequired}
                                        onChange={(e) => {
                                            // this.handleChange(isRequired, e.target.value, item.key, index);
                                        }}
                                    >
                                        <Radio value>是</Radio>
                                        <Radio value={false}>否</Radio>
                                    </Radio.Group>
                                </FormItem>
                                <FormItem label="应用">
                                    <Radio.Group
                                        value={item.type}
                                        onChange={(e) => {
                                            // this.handleChange(TYPE, e.target.value, item.key, index);
                                        }}
                                    >
                                        <Radio value={1}>凯叔</Radio>
                                        <Radio value={2}>绘本</Radio>
                                    </Radio.Group>
                                </FormItem>
                            </div>
                        );
                    })} */}
                {/* <FormItem name={FIELD_DICT.ISREQUIRED} label={ALIAS.ISREQUIRED} required>
                    <Radio.Group>
                        {ISREQUIRED_TYPE.map(({ VALUE, LABEL }, index) => (
                            <Radio key={index} value={VALUE}>
                                {LABEL}
                            </Radio>
                        ))}
                    </Radio.Group>
                </FormItem> */}
            </Form>
        </div>
    );
};
