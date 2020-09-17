import React, { Component } from 'react';
import { Select, Form } from 'antd';
import { getInitJson, getTools } from './utils';
import { SelectProps, OptionData } from './interface';
import { FORMITEM_LAYOUT } from '../../constants';
import Config from './config';

const Option = Select.Option;

interface KSelectProps extends SelectProps {
    config: {
        options: OptionData[];
        label: string;
    };
}

class KSelect extends Component<KSelectProps> {

    render() {
        const { allowClear, disabled, placeholder, showSearch, config } = this.props;
        const { options = [], label } = config;
        const selectProps = {
            allowClear,
            disabled,
            placeholder,
            showSearch
        };
        return (
            <Form.Item
                label={label}
                {...FORMITEM_LAYOUT}
                style={{ marginBottom: 0 }}
            >
                <Select
                    {...selectProps}
                    optionFilterProp='children'
                    style={{
                        width: '300px'
                    }}
                    filterOption={(input: any, option: any) => {
                        return option.props.value.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) > -1;
                    }}
                >
                    {
                        options.length && options.length > 0 && options.map((item, index) => {
                            return <Option key={index} value={item && item.props && item.props.value}>{item && item.label}</Option>;
                        })
                    }
                </Select>
            </Form.Item>
        );
    }
}

export {
    KSelect as component,
    getInitJson,
    getTools,
    Config as config
};
