import React from 'react';
import { Checkbox, Form } from 'antd';
import Config from './config';
import { getInitJson, getTools } from './utils';
import { FORMITEM_LAYOUT } from '../../constants';

interface Props {
    config: {
        options: [{
            props: {
                disabled: boolean;
                checked: boolean;
                value: string;
            };
            text: string;
            rowKey: number;
        }];
        label: string;
        key: string;
    };
}

class KCheckbox extends React.Component<Props> {

    render() {
        const { config } = this.props;
        return (
            <Form.Item
                label={config && config.label ? config.label : '表单名称'}
                {...FORMITEM_LAYOUT}
                style={{ marginBottom: 0 }}
            >
                {
                    config.label
                        ? config.options.map((ele, index) => {
                            return <Checkbox
                                key={index}
                                checked={ele.props.checked}
                                disabled={ele.props.disabled}
                            >{ele.text}</Checkbox>;
                        })
                        : <Checkbox
                            checked={false}
                            disabled={false}
                        >选择项</Checkbox>
                }
            </Form.Item>
        );
    }
}

export {
    KCheckbox as component,
    getInitJson,
    getTools,
    Config as config
};
