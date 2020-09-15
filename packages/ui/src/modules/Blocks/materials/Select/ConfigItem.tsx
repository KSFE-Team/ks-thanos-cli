import React, { Component } from 'react';
import { Input, Radio, Form } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

interface ConfigItemProps {
    type: string;
    name: string;
    label: string;
    form: any;
    formItemLayout: any;
    defaultValue: any;
    onChange: any;
    prevdata: any;
}

/**
 * boolean表单数据自动生成
 */
export default class ConfigItem extends Component<ConfigItemProps> {
    state = {};

    renderContent(type: any, name: any, otherProps: any) {
        let content;

        switch (type) {
            case 'boolean':
                content = (
                    <RadioGroup
                        {...otherProps}
                        onChange={(e) => { this.handleChange(name, e.target.value); }}
                    >
                        <Radio value={true}>true</Radio>
                        <Radio value={false}>false</Radio>
                    </RadioGroup>
                );
                break;
            default:
                content = (
                    <Input
                        {...otherProps}
                        onChange={(e) => { this.handleChange(name, e.target.value); }}
                    />
                );
                break;
        }

        return content;
    }

    handleChange = (name: any, value: any) => {
        const newProps = this.props.prevdata;
        newProps[name] = value;
        this.props.onChange(newProps);
    };

    render() {
        const { name, label, formItemLayout, type, ...otherProps } = this.props;
        return (
            <FormItem
                label={label}
                {...formItemLayout}
            >
                {this.renderContent(type, name, otherProps)}
            </FormItem>
        );
    }
}
