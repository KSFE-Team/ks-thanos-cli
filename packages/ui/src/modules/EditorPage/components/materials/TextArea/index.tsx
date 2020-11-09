import React from 'react';
import { Input, Form } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import TextAreaConfig from './config';

const { TextArea } = Input;

interface TextAreaConfigProps extends ComponentConfig {
    props: any;
    id: string;
}

const DEFAULT_LABEL = '备注信息';

const MaterialTextArea = (props: TextAreaConfigProps) => {
    const { id, props: configProps } = props;
    const formConfig = props[id];
    const { label = DEFAULT_LABEL, placeholder = DEFAULT_LABEL } = formConfig;
    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label}>
            <TextArea
                {...configProps}
                placeholder={placeholder}
                style={{
                    width: '300px',
                }}
            />
        </Form.Item>
    );
};

export { MaterialTextArea as component, TextAreaConfig as config, tools };
