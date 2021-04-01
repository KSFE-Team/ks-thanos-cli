import React from 'react';
import { Input, Form } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import ConditionsConfig from './config';

interface ConditionsConfigProps extends ComponentConfig {
    props: any;
    id: string;
}

const DEFAULT_LABEL = '版本号';

const MaterialConditions = (props: ConditionsConfigProps) => {
    const { id, props: configProps } = props;
    const formConfig = props[id];
    const { label = DEFAULT_LABEL, placeholder = DEFAULT_LABEL } = formConfig;
    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label}>
            <Input
                {...configProps}
                placeholder={placeholder}
                // style={{
                //     width: '300px',
                // }}
            />
        </Form.Item>
    );
};

export { MaterialConditions as component, ConditionsConfig as config, tools };
