import React from 'react';
import { Form, Input, Button } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import Card from 'Src/components/Card';

const FormItem = Form.Item;
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
const LABEL = 'label';
const KEY = 'key';
const SORT_KEY = 'sortKey';
const ADD_BUTTON_TEXT = 'addButtonText';
const url = 'http://kaishufe.kaishustory.com/h5/ks-cms-ui/#/extendContainer';

interface ExtendContainerConfigProps extends ComponentConfig {}

export default (props: ExtendContainerConfigProps) => {
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
                        componentName: 'ExtendContainer',
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
                    <FormItem label="label" name={LABEL} {...formItemLayout} required>
                        <Input placeholder="例如： 故事列表" />
                    </FormItem>
                    <FormItem label="key" name={KEY} {...formItemLayout} required>
                        <Input placeholder="例如： storyList" />
                    </FormItem>
                    <FormItem label="排序key" name={SORT_KEY} {...formItemLayout} required>
                        <Input placeholder="例如： __keys" />
                    </FormItem>
                    <FormItem label="按钮文案" name={ADD_BUTTON_TEXT} {...formItemLayout} required>
                        <Input placeholder="例如： 添加" />
                    </FormItem>
                    <div style={{ marginBottom: '10px', color: '', marginLeft: '10px' }}>
                        <span>详细使用方法请查看文档:</span>
                        <Button
                            type="link"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(url);
                            }}
                        >
                            点击查看
                        </Button>
                    </div>
                </Card>
            </Form>
        </div>
    );
};
