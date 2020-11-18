import React from 'react';
import { DatePicker, Form } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import DatepickerConfig from './config';

interface DatePickerConfigProps extends ComponentConfig {
    props: any;
    id: string;
}

const DEFAULT_LABEL = '日期';

const MaterialDatePicker = (props: DatePickerConfigProps) => {
    const { id, props: configProps } = props;
    const formConfig = props[id];
    const { label = DEFAULT_LABEL } = formConfig;
    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label}>
            <DatePicker
                {...configProps}
                placeholder={label}
                style={{
                    width: '300px',
                }}
            />
        </Form.Item>
    );
};

export { MaterialDatePicker as component, DatepickerConfig as config, tools };
