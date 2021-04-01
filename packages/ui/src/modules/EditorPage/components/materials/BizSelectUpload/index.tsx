import React from 'react';
import { Form, Input } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import BizSelectUploadConfig from './config';

interface BizSelectUploadConfigProps extends ComponentConfig {
    props: any;
    id: string;
}
const DEFAULT_LABEL = '选择对应内容';
const MaterialBizSelectUpload = (props: BizSelectUploadConfigProps) => {
    const { id, props: configProps } = props;
    const formConfig = props[id];
    const label = formConfig.label ? formConfig.label : DEFAULT_LABEL;
    const placeholder = formConfig.placeholder ? formConfig.placeholder : DEFAULT_LABEL;
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

export { MaterialBizSelectUpload as component, BizSelectUploadConfig as config, tools };
