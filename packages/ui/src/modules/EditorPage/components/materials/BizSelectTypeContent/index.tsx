import React, { Fragment } from 'react';
import { Form, Radio, Input } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import { CONTENT_ARR } from './utils';

const RadioGroup = Radio.Group;
const DEFAULT_LABEL = '内容类型';
interface BizTimingSettingConfigProps extends ComponentConfig {
    props: any;
    id: string;
}

const MaterialBizTimingSetting = (props: BizTimingSettingConfigProps) => {
    const { id, props: configProps } = props;
    const formConfig = props[id];
    const { label = DEFAULT_LABEL } = formConfig;
    return (
        <div>
            <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label}>
                <RadioGroup>
                    {CONTENT_ARR.map(({ label, value }) => {
                        return (
                            <Radio value={value} key={value}>
                                {label}
                            </Radio>
                        );
                    })}
                </RadioGroup>
            </Form.Item>
            <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label}>
                <Input
                    {...configProps}
                    placeholder={label}
                    style={{
                        width: '300px',
                    }}
                />
            </Form.Item>
        </div>
    );
};

export { MaterialBizTimingSetting as component, BizTimingSettingConfig as config, tools };
