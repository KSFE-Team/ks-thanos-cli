import React from 'react';
import { Checkbox, Form } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import Config from './config';
import * as tools from './utils';
import { Option } from './utils';

interface MaterialCheckboxProps extends ComponentConfig {
    props: any;
    id: string;
}

const DEFAULT_VALUE = {
    label: '演示',
    value: 1,
};

const DEFAULT_LABEL = '复选框';

const MaterialCheckbox = (props: MaterialCheckboxProps) => {
    const { id } = props;
    const formConfig = props[id];
    const label = formConfig.label ? formConfig.label : DEFAULT_LABEL;
    const options = formConfig.options ? formConfig.options : [DEFAULT_VALUE];
    const { isRequired } = formConfig;
    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label} required={isRequired}>
            {options.map((option: Option, index: number) => {
                const { label: optionLabel, value, text } = option;
                return (
                    <Checkbox key={index} value={value}>
                        {optionLabel || text}
                    </Checkbox>
                );
            })}
        </Form.Item>
    );
};

export { MaterialCheckbox as component, Config as config, tools };
