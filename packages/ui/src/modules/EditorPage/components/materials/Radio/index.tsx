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
        props: {
            value: '1',
        },
    },
    {
        label: '禁用',
        props: {
            value: '2',
        },
    },
];

const DEFAULT_LABEL = '单选框';

const MaterialRadio = (props: MaterialRadioProps) => {
    const { id } = props;
    const formConfig = props[id];
    const { label = DEFAULT_LABEL, options = DEFAULT_VALUE } = formConfig;
    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label}>
            {options.map((option: Option) => {
                const { label: optionLabel, props: optionProps } = option;
                return <Radio key={optionProps.value}>{optionLabel}</Radio>;
            })}
        </Form.Item>
    );
};

export { MaterialRadio as component, RadioConfig as config, tools };
