import React from 'react';
import { Radio, Form } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import RadioConfig from './config';
import { Option } from './utils';

interface MaterialRadioProps extends ComponentConfig {
    props: any;
    label: string;
}
const DEFAULT_VALUE = [
    {
        label: '启用',
        value: '1',
    },
    {
        label: '禁用',
        value: '2',
    },
];

const DEFAULT_LABEL = '单选框';

const MaterialRadio = (props: MaterialRadioProps) => {
    const { id } = props;
    const formConfig = props[id];
    const label = formConfig.label ? formConfig.label : DEFAULT_LABEL;
    const options = formConfig.options && formConfig.options.length > 0 ? formConfig.options : DEFAULT_VALUE;
    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label}>
            {options.map((option: Option, index: number) => {
                const { label: optionLabel, value, text } = option;
                return (
                    <Radio key={index} value={value}>
                        {optionLabel || text}
                    </Radio>
                );
            })}
        </Form.Item>
    );
};

export { MaterialRadio as component, RadioConfig as config, tools };
