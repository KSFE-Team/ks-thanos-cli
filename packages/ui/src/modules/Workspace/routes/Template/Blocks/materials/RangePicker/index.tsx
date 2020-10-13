import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {DatePicker, Form} from 'antd';
import { getInitJson, getTools } from './utils';
import RangePickerConfig from './config';
import { FORMITEM_LAYOUT } from '../../constants';

interface KRangePickerProps {
    config: any;
}

const RangePicker = DatePicker.RangePicker;

class KRangePicker extends Component<KRangePickerProps> {

    static propTypes = {
        props: PropTypes.object
    };

    render() {
        const { config, ...OtherProps } = this.props;
        const { label = '' } = config;
        return (
            <Form.Item
                {...FORMITEM_LAYOUT}
                style={{ marginBottom: 0 }}
                label={label}
            >
                <RangePicker
                    {...OtherProps}
                />
            </Form.Item>
        );
    }
}

export {
    KRangePicker as component,
    getInitJson,
    getTools,
    RangePickerConfig as config
};
