import React from 'react';
import { Input, Form } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import { getInitJson, getTools, validator } from './utils';
import InputConfig from './config';

interface MaterialInputProps extends ComponentConfig {
    config: any;
    props: any;
    id: string;
}

const MaterialInput = (props: MaterialInputProps) => {
    const { config = {}, id, props: configProps } = props;
    const formConfig = props[id];
    const { label = '' } = Object.keys(formConfig).length ? formConfig : config;
    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label}>
            <Input
                {...configProps}
                style={{
                    width: '300px',
                }}
            />
        </Form.Item>
    );
};

export { MaterialInput as component, getInitJson, validator, getTools, InputConfig as config };
