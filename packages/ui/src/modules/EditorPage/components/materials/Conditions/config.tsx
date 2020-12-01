import React from 'react';
import { Form, Select, Radio } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import Card from 'Src/components/Card';
import { DEFAULT_OPTIONS } from './utils';

const FIELD = {
    FORMFIELDS: 'formfields',
    TYPE: 'type',
    KEY: 'key',
    REQUIRED: 'required',
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
    const formfields = config[FIELD.FORMFIELDS] || [];

    return (
        <div>
            <Form
                layout="vertical"
                onValuesChange={(_, allFields) => {
                    const formfieldsArray =
                        allFields.type &&
                        allFields.type.length &&
                        allFields.type.map((item: string) => {
                            return {
                                key: item,
                                required: allFields[`required_${item}`],
                                type: allFields[`type_${item}`],
                            };
                        });
                    actions[id].setReducers({
                        formfields: formfieldsArray,
                        ...allFields,
                        type: allFields.type,
                        isChange: true,
                    });
                }}
                fields={Object.keys(config).map((key: string) => {
                    return {
                        name: [key],
                        value: config[key],
                    };
                })}
            >
                <Card title={config.componentName}>
                    <FormItem name={FIELD.TYPE} label="版本号" required>
                        <Select placeholder="请选择" style={{ width: '100%', color: '#000' }} showSearch mode="tags">
                            {children}
                        </Select>
                    </FormItem>
                    {formfields.map((item: any, index: number) => {
                        const optionObj = DEFAULT_OPTIONS.find(({ value }) => value === item[FIELD.KEY]) || {
                            name: '',
                        };
                        return (
                            <div key={item[FIELD.KEY]} style={{ display: 'flex' }}>
                                <FormItem label="类型" style={{ marginRight: '15px' }} required>
                                    <p>{optionObj.name}</p>
                                </FormItem>
                                <FormItem
                                    label="是否必填"
                                    style={{ marginRight: '15px' }}
                                    name={`${FIELD.REQUIRED}_${item[FIELD.KEY]}`}
                                    required
                                    initialValue={item[FIELD.REQUIRED] !== false}
                                >
                                    <Radio.Group>
                                        <Radio value>是</Radio>
                                        <Radio value={false}>否</Radio>
                                    </Radio.Group>
                                </FormItem>
                                <FormItem
                                    label="应用"
                                    name={`${FIELD.TYPE}_${item[FIELD.KEY]}`}
                                    required
                                    initialValue={item[FIELD.TYPE] || 1}
                                >
                                    <Radio.Group>
                                        <Radio value={1}>凯叔</Radio>
                                        <Radio value={2}>绘本</Radio>
                                    </Radio.Group>
                                </FormItem>
                            </div>
                        );
                    })}
                </Card>
            </Form>
        </div>
    );
};
