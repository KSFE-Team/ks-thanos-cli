import React from 'react';
import { Select, Form } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import { FORMITEM_LAYOUT } from '../../../utils/constants';
import * as tools from './utils';
import SelectConfig from './config';

const { Option } = Select;
interface MaterialSelectProps extends ComponentConfig {
    props: any;
    id: string;
}

const DEFAULT_LABEL = '下拉框';

const MaterialSelect = (props: MaterialSelectProps) => {
    const { id } = props;
    const formConfig = props[id];
    const label = formConfig.label ? formConfig.label : DEFAULT_LABEL;
    const { options = [], isRequired, componentName, ...otherConfig } = formConfig;

    return (
        <Form.Item {...FORMITEM_LAYOUT} style={{ marginBottom: '8px' }} label={label} required={isRequired}>
            <Select
                {...otherConfig}
                optionFilterProp="children"
                placeholder={label}
                // style={{
                //     width: '300px',
                // }}
                filterOption={(input, option: any) => {
                    return (
                        option.value.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
                        option.children.toLowerCase().indexOf(input.toLowerCase()) > -1
                    );
                }}
            >
                {options.map((opt: any, index: number) => {
                    return (
                        <Option value={opt.value} key={index}>
                            {opt.label}
                        </Option>
                    );
                })}
            </Select>
        </Form.Item>
    );
};

export { MaterialSelect as component, SelectConfig as config, tools };
