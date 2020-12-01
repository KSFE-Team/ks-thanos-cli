import React from 'react';
import { useSelector } from 'react-redux';
import { actions } from 'kredux';
import { Form, Input } from 'antd';
import Card from 'Src/components/Card';
import { getComponents } from '../../../utils/constants';

const { Item: FormItem } = Form;

export default () => {
    const page = useSelector((store: any) => store.page);
    const { pageJson, undoStack } = page;
    const [id, componentName] = page.selectedId.split('_');
    let configContent;
    if (id) {
        const ConfigForm = getComponents()[componentName].config;
        configContent = <ConfigForm id={id} undoStack={undoStack} />;
    } else {
        configContent = (
            <div>
                <Form
                    layout="vertical"
                    onValuesChange={(_, allFields) => {
                        actions.page.setReducers({
                            pageJson: {
                                ...pageJson,
                                ...allFields,
                            },
                        });
                    }}
                    onBlur={() => {
                        const copyPageJson = JSON.parse(JSON.stringify(pageJson));
                        const undoItem = {
                            type: 'page',
                            pageJson: copyPageJson,
                        };
                        undoStack.push(undoItem);
                        actions.page.setReducers({
                            undoStack,
                        });
                    }}
                    fields={[
                        {
                            name: ['pageName'],
                            value: pageJson.pageName,
                        },
                        {
                            name: ['paramKey'],
                            value: pageJson.paramKey,
                        },
                    ]}
                >
                    <Card title="页面配置">
                        <FormItem label="页面名称(英文)" name="pageName" required>
                            <Input />
                        </FormItem>
                        <FormItem label="页面路由参数" name="paramKey">
                            <Input />
                        </FormItem>
                    </Card>
                </Form>
            </div>
        );
    }
    return <div className="thanos-editor-property">{configContent}</div>;
};
