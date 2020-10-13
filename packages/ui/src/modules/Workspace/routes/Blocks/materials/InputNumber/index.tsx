import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Form } from 'antd';
import { getInitJson, getTools } from './utils';
import { FORMITEM_LAYOUT } from '../../constants';
import InputConfig from './config';

interface KInputNumberProps {
    label: string;
    config: any;
    defaultValue: number;
}

class KInputNumber extends Component<KInputNumberProps> {
    static propTypes = {
        props: PropTypes.object
    };

    static defaultProps = {
        label: '数字框'
    };

    render() {
        const {config, ...other} = this.props;
        const { label = '' } = config;
        let props: { value?: number; [name: string]: any } = other;
        if ('defaultValue' in other) {
            props.value = other.defaultValue;
            delete props.defaultValue;
        }
        return (
            <Form.Item
                {...FORMITEM_LAYOUT}
                style={{marginBottom: 0}}
                label={label}>
                <InputNumber
                    {...props}
                />
            </Form.Item>

        );
    }
}

export {
    KInputNumber as component,
    getInitJson,
    getTools,
    InputConfig as config
};
