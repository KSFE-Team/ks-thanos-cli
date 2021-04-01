import React from 'react';
import { DatePicker, Form } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import RangePickerConfig from './config';

interface RangePickerConfigProps extends ComponentConfig {
    props: any;
    id: string;
}

const { RangePicker } = DatePicker;
const DEFAULT_LABEL = ['开始时间', '截止时间'];

const MaterialRangePicker = (props: RangePickerConfigProps) => {
    const { id, props: configProps } = props;
    const formConfig = props[id];
    const label = formConfig.label ? formConfig.label : DEFAULT_LABEL.join('');
    const placeholder = formConfig.placeholder ? formConfig.placeholder.split('/') : DEFAULT_LABEL;
    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label}>
            <RangePicker
                {...configProps}
                placeholder={placeholder}
                // style={{
                //     width: '300px',
                // }}
            />
        </Form.Item>
    );
};

export { MaterialRangePicker as component, RangePickerConfig as config, tools };
