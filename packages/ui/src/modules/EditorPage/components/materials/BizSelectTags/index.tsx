import React from 'react';
import { Button, Form } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import BizSelectTagsConfig from './config';

interface BizSelectTagsConfigProps extends ComponentConfig {
    props: any;
    id: string;
}

const DEFAULT_LABEL = '故事';
const DEFAULT_BUTTON_TEXT = '添加';

const MaterialBizSelectTags = (props: BizSelectTagsConfigProps) => {
    const { id } = props;
    const formConfig = props[id];
    const { label = DEFAULT_LABEL, isRequired, buttonText = DEFAULT_BUTTON_TEXT } = formConfig;
    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label} required={isRequired}>
            <Button type="primary">{buttonText}</Button>
        </Form.Item>
    );
};

export { MaterialBizSelectTags as component, BizSelectTagsConfig as config, tools };
