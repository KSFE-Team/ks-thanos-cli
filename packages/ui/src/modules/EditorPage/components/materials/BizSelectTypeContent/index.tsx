import React from 'react';
import { Form, Input } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import BizSelectTypeContentConfig from './config';
import CustomerRadio from '../../CustomerRadio';

const DEFAULT_LABEL = '内容类型';
export const CONTENT_ARR = [
    {
        label: '专辑',
        value: 'album',
    },
    {
        label: '故事',
        value: 'story',
    },
];
interface BizSelectTypeContentConfigProps extends ComponentConfig {
    props: any;
    id: string;
}

const MaterialBizSelectTypeContent = (props: BizSelectTypeContentConfigProps) => {
    const { id, props: configProps } = props;
    const formConfig = props[id];
    const typeLabel = formConfig.typeLabel ? formConfig.typeLabel : DEFAULT_LABEL;
    return (
        <div>
            <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={typeLabel}>
                {CONTENT_ARR.map(({ label: name, value }) => {
                    return <CustomerRadio key={value}>{name}</CustomerRadio>;
                })}
            </Form.Item>
            <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={typeLabel}>
                <Input.Search
                    {...configProps}
                    placeholder={typeLabel}
                    // style={{
                    //     width: '300px',
                    // }}
                />
            </Form.Item>
        </div>
    );
};

export { MaterialBizSelectTypeContent as component, BizSelectTypeContentConfig as config, tools };
