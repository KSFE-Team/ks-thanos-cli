import React from 'react';
import { Form, Input, Radio, Button } from 'antd';
import { actions } from 'kredux';
import { ComponentConfig } from 'Src/types/componentConfig';
import Card from 'Src/components/Card';
import { ISREQUIRED_TYPE, ALIAS, FIELD_DICT } from '../../../utils/constants';
import { CONFIG_TYPE, ALAS_FiELDS } from './utils';

interface BizTimingSettingConfigProps extends ComponentConfig {}

export default (props: BizTimingSettingConfigProps) => {
    const { id, undoStack } = props;
    const config = props[id] || {};
    const url = 'https://kaishu.yuque.com/nbdzm5/kms/ggklfp';
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
                        componentName: 'BizTimingSetting',
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
                <Card title={config.componentName}>
                    <Form.Item name={FIELD_DICT.TYPE} label={ALIAS.TYPE} required>
                        <Radio.Group options={CONFIG_TYPE}> </Radio.Group>
                    </Form.Item>
                    <Form.Item name={FIELD_DICT.ISREQUIRED} label={ALIAS.ISREQUIRED} required>
                        <Radio.Group>
                            {ISREQUIRED_TYPE.map(({ VALUE, LABEL }, index) => (
                                <Radio key={index} value={VALUE}>
                                    {LABEL}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                    {ALAS_FiELDS.map(({ name, label, placeholder }, index) => {
                        return (
                            <Form.Item name={name} label={label} key={index}>
                                <Input placeholder={placeholder} />
                            </Form.Item>
                        );
                    })}
                    <div style={{ marginBottom: '10px', color: '', marginLeft: '10px' }}>
                        <p>以上字段均有默认值，支持单独修改字段。</p>
                        <span>具体字段参数请参考:</span>
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
