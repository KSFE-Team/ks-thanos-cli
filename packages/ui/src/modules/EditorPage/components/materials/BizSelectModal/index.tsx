import React from 'react';
import { Input, Form } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import BizSelectModalConfig from './config';

interface BizSelectModalConfigProps extends ComponentConfig {
    props: any;
    id: string;
}

const DEFAULT_LABEL = '内容';

const MaterialBizSelectModal = (props: BizSelectModalConfigProps) => {
    const { id, props: configProps } = props;
    const formConfig = props[id];
    const label = formConfig.label ? formConfig.label : DEFAULT_LABEL;
    const placeholder = formConfig.placeholder ? formConfig.placeholder : DEFAULT_LABEL;
    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label}>
            <Input
                {...configProps}
                placeholder={placeholder}
                style={{
                    width: '300px',
                }}
            />
        </Form.Item>
    );
};

export { MaterialBizSelectModal as component, BizSelectModalConfig as config, tools };
