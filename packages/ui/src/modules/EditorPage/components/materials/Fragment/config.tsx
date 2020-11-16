import React, { ReactNode } from 'react';
import { Form, Input, Radio } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORM_TYPES } from './constants';

const [{ key: NORMAL }, { key: SEARCH }] = FORM_TYPES;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
};
const STATE_NAME = 'stateName';
const TYPE = 'type';
const SAVE_API = 'saveApi';
const UPDATE_API = 'updateApi';
const GET_API = 'getApi';
const PARAM_KEY = 'paramKey';

interface FormConfigProps extends ComponentConfig {}

export default (props: FormConfigProps) => {
    const { id } = props;
    const config = props[id] || {};

    /* 根据表单类型渲染节点 */
    const getFormByType = (): ReactNode => {
        switch (config[TYPE]) {
            case NORMAL:
                return (
                    <>
                        <FormItem label="新增API" {...formItemLayout} name={SAVE_API} required>
                            <Input placeholder="新增API" />
                        </FormItem>
                        <FormItem label="修改API" {...formItemLayout} name={UPDATE_API} required>
                            <Input placeholder="修改API" />
                        </FormItem>
                        <FormItem label="查询API" {...formItemLayout} name={GET_API} required>
                            <Input placeholder="查询API" />
                        </FormItem>
                        <FormItem label="路由参数" {...formItemLayout} name={PARAM_KEY} required>
                            <Input placeholder="路由参数" />
                        </FormItem>
                    </>
                );
            case SEARCH:
            default:
                return null;
        }
    };

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
                <FormItem label="表单存储key" name={STATE_NAME} {...formItemLayout} required>
                    <Input placeholder="例如： searchForm | userInfo" />
                </FormItem>
                <FormItem label="表单类型" name={TYPE} {...formItemLayout} required>
                    <RadioGroup>
                        {FORM_TYPES.map(({ key, name }) => {
                            return (
                                <Radio key={key} value={key}>
                                    {name}
                                </Radio>
                            );
                        })}
                    </RadioGroup>
                </FormItem>
                {getFormByType()}
            </Form>
        </div>
    );
};
