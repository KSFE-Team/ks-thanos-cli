import React from 'react';
import { Form, Radio, Input } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import BizSelectTypeContentConfig from './config';

const RadioGroup = Radio.Group;
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
    const { label = DEFAULT_LABEL } = formConfig;
    return (
        <div>
            <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label}>
                <RadioGroup value="album">
                    {CONTENT_ARR.map(({ label: name, value }) => {
                        return (
                            <Radio value={value} key={value}>
                                {name}
                            </Radio>
                        );
                    })}
                </RadioGroup>
            </Form.Item>
            <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label}>
                <Input.Search
                    {...configProps}
                    placeholder={label}
                    style={{
                        width: '300px',
                    }}
                />
            </Form.Item>
        </div>
    );
};

export { MaterialBizSelectTypeContent as component, BizSelectTypeContentConfig as config, tools };
