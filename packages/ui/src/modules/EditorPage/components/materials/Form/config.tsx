import React, { ReactNode } from 'react';
import { Form, Input, Radio } from 'antd';
import { actions } from 'kredux';
import Card from 'Src/components/Card';
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
    const { id, undoStack } = props;
    const config = props[id] || {};

    /* 根据表单类型渲染节点 */
    const getFormByType = (): ReactNode => {
        switch (config[TYPE]) {
            case NORMAL:
                return (
                    <Card title="接口及路由参数配置">
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
                    </Card>
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
                onBlur={() => {
                    const copyConfig = JSON.parse(JSON.stringify(config));
                    const undoItem = {
                        type: 'property',
                        formConfig: copyConfig,
                        id,
                        componentName: 'Form',
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
                <Card title="基础配置">
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
                </Card>
                {getFormByType()}
            </Form>
        </div>
    );
};
