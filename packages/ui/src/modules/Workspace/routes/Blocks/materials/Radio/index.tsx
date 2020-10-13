import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Form } from 'antd';
import { getInitJson, getTools } from './utils';
import { FORMITEM_LAYOUT } from '../../constants';
import RadioConfig from './config';

interface RadioProps {
    config: any;
    label: string;
    defaultValue: string;
}

class KRadio extends Component<RadioProps> {
    static propTypes = {
        props: PropTypes.object,
        config: PropTypes.object,

    };

    state={
        defaultValue: this.props.config.defaultValue,
    };

    componentWillReceiveProps(nextProps: any) {
        this.setState({
            defaultValue: nextProps.config.defaultValue
        });
    }

    render() {
        return (
            <Form.Item
                {...FORMITEM_LAYOUT}
                style={{ marginBottom: 0 }}
                label={this.props.config.label}
            >
                <Radio.Group value={this.state.defaultValue} onChange={(e) => {
                    this.setState({
                        defaultValue: e.target.value
                    });
                }}>
                    {
                        this.props.config.options.map((item: any) => {
                            return <div style={{display: 'inline-block'}} key={item.rowKey} onClick={(e) => {
                                e.stopPropagation();
                            }}><Radio value={item.value} disabled={item.disabled}>{item.text}</Radio></div>;
                        })
                    }
                </Radio.Group>
            </Form.Item>

        );
    }
}

export {
    KRadio as component,
    getInitJson,
    getTools,
    RadioConfig as config
};
