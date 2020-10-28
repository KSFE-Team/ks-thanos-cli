import React from 'react';
import { Input, Form } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import InputConfig from './config';

interface MaterialInputProps extends ComponentConfig {
    props: any;
    id: string;
}

const DEFAULT_LABEL = '输入框';

const MaterialInput = (props: MaterialInputProps) => {
    const { id, props: configProps } = props;
    const formConfig = props[id];
    const { label = DEFAULT_LABEL } = formConfig;
    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label}>
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

export { MaterialInput as component, InputConfig as config, tools };
