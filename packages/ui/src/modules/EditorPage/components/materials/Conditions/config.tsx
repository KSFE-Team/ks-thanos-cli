import React from 'react';
import { Form, Select, Radio } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
// import { useSelector } from 'react-redux';
// import { ALIAS, ISREQUIRED_TYPE } from '../../../utils/constants'; // FIELD_DICT
import { DEFAULT_OPTIONS } from './utils';

const FIELD = {
    FORMFIELDS: 'formfields',
    OPTIONTYPE: 'optionType',
    TYPE: 'type',
    KEY: 'key',
    ISREQUIRED: 'isRequired',
};
const FormItem = Form.Item;
const { Option } = Select;

interface ConditionsProps extends ComponentConfig {}

export default (props: ConditionsProps) => {
    const { id } = props;
    // const { page, sotres } = useSelector((store: any) => ({ page: store.page, sotres: store }));
    const config = props[id] || {};
    const children = DEFAULT_OPTIONS.map((option, index) => (
        <Option key={index} value={option.value}>
            {option.name}({option.value})
        </Option>
    ));
    const aliasArray = config[FIELD.OPTIONTYPE] || [];
    const formfields = config[FIELD.FORMFIELDS] || [];
    const newFormfields = aliasArray.map((key: string) => {
        const obj = formfields.find((item: any) => item.key === key) || { isRequired: true, type: 1 };
        return {
            key,
            isRequired: obj.isRequired,
            type: obj.type,
        };
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
                <FormItem name={FIELD.OPTIONTYPE} label="版本号" required>
                    <Select placeholder="请选择" style={{ width: '100%', color: '#000' }} showSearch mode="tags">
                        {children}
                    </Select>
                </FormItem>
                {newFormfields.map((item: any, index: number) => {
                    const optionObj = DEFAULT_OPTIONS.find(({ value }) => value === item[FIELD.KEY]) || { name: '' };
                    return (
                        <div key={item[FIELD.KEY]} style={{ display: 'flex' }}>
                            <FormItem label="类型" style={{ marginRight: '15px' }} name={item[FIELD.KEY]}>
                                <p>{optionObj.name}</p>
                            </FormItem>
                            <FormItem label="是否必填" style={{ marginRight: '15px' }} name={item[FIELD.ISREQUIRED]}>
                                <Radio.Group>
                                    <Radio value>是</Radio>
                                    <Radio value={false}>否</Radio>
                                </Radio.Group>
                            </FormItem>
                            <FormItem label="应用" name={item[FIELD.TYPE]}>
                                <Radio.Group>
                                    <Radio value={1}>凯叔</Radio>
                                    <Radio value={2}>绘本</Radio>
                                </Radio.Group>
                            </FormItem>
                        </div>
                    );
                })}
            </Form>
        </div>
    );
};
