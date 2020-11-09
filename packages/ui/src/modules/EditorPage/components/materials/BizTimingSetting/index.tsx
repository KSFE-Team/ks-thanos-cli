import React from 'react';
import { Form, Radio } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import BizTimingSettingConfig from './config';

const CONFIG_TYPE = [
    {
        label: '分时',
        value: 1,
    },
    {
        label: '分日',
        value: 2,
    },
];

interface BizTimingSettingConfigProps extends ComponentConfig {
    props: any;
    id: string;
}

const MaterialBizTimingSetting = (props: BizTimingSettingConfigProps) => {
    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label="定时配置">
            <Radio.Group>
                {CONFIG_TYPE.map(({ label, value }, index) => (
                    <Radio key={index} value={value}>
                        {label}
                    </Radio>
                ))}
            </Radio.Group>
        </Form.Item>
    );
};

export { MaterialBizTimingSetting as component, BizTimingSettingConfig as config, tools };
