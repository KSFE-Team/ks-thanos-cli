import React from 'react';
import { InputNumber, Form } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import InputNumberConfig from './config';

interface InputNumberConfigProps extends ComponentConfig {
    props: any;
    id: string;
}

const DEFAULT_LABEL = '数字框';

const MaterialInputNumber = (props: InputNumberConfigProps) => {
    const { id, props: configProps } = props;
    const formConfig = props[id];
    const label = formConfig.label ? formConfig.label : DEFAULT_LABEL;
    const placeholder = formConfig.placeholder ? formConfig.placeholder : DEFAULT_LABEL;
    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label}>
            <InputNumber
                {...configProps}
                placeholder={placeholder}
                style={{
                    width: '300px',
                }}
            />
        </Form.Item>
    );
};

export { MaterialInputNumber as component, InputNumberConfig as config, tools };
