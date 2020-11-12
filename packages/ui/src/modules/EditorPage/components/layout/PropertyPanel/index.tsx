import React from 'react';
import { useSelector } from 'react-redux';
import { actions } from 'kredux';
import { Form, Input } from 'antd';
import { getComponents } from '../../../utils/constants';

const { Item: FormItem } = Form;

export default () => {
    const page = useSelector((store: any) => store.page);
    const { pageJson } = page;
    const [id, componentName] = page.selectedId.split('_');
    let configContent;
    if (id) {
        const ConfigForm = getComponents()[componentName].config;
        configContent = <ConfigForm id={id} />;
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
                    <FormItem label="页面名称(英文)" name="pageName" required>
                        <Input />
                    </FormItem>
                    <FormItem label="页面路由参数" name="paramKey">
                        <Input />
                    </FormItem>
                </Form>
            </div>
        );
    }
    return <div className="thanos-editor-property">{configContent}</div>;
};
