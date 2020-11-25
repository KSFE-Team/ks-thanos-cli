import React from 'react';
import { Form, DatePicker } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import KSDatePickerConfig from './config';

interface KSDatePickerConfigProps extends ComponentConfig {
    props: any;
    id: string;
}

const DEFAULT_LABEL = '日期';

const MaterialKSDatePicker = (props: KSDatePickerConfigProps) => {
    const { id, props: configProps } = props;
    const formConfig = props[id];
    const label = formConfig.label ? formConfig.label : DEFAULT_LABEL;
    const placeholder = formConfig.placeholder ? formConfig.placeholder : DEFAULT_LABEL;
    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label}>
            <DatePicker
                {...configProps}
                placeholder={placeholder}
                style={{
                    width: '300px',
                }}
            />
        </Form.Item>
    );
};

export { MaterialKSDatePicker as component, KSDatePickerConfig as config, tools };
