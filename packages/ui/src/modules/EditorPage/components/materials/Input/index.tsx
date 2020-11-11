import React from 'react';
import { Input, Form } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import InputConfig from './config';

interface MaterialDatePickerProps extends ComponentConfig {
    props: any;
    id: string;
}

const DEFAULT_LABEL = '输入框';

const MaterialDatePicker = (props: MaterialDatePickerProps) => {
    const { id, props: configProps } = props;
    const formConfig = props[id];
    const { label = DEFAULT_LABEL, isRequired } = formConfig;
    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label} required={isRequired}>
            <Input
                {...configProps}
                placeholder={label}
                style={{
                    width: '300px',
                }}
            />
        </Form.Item>
    );
};

export { MaterialDatePicker as component, InputConfig as config, tools };
