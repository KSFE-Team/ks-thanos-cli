import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import Icon from '@ant-design/icons';

interface DynamicConfigItemProps {
    form: any;
    label: string;
    name: string;
    addText: string;
    defaultValue: any[];
    onChange: any;
}

export default class DynamicConfigItem extends Component<DynamicConfigItemProps> {

    state = {
        id: 0,
        current: this.props.defaultValue || []
    };

    remove = (index: any) => {
        const tempArr = JSON.parse(JSON.stringify(this.state.current));
        tempArr.splice(index, 1);
        this.setState({
            current: [...tempArr]
        }, () => {
            this.props.onChange(this.state.current);
        });
    };

    add = () => {
        const arr = [...this.state.current];
        const tempId = this.state.id - 1;
        arr.push({
            id: this.state.id,
            label: '',
            props: {
                value: ''
            }
        });
        this.setState({
            current: [...arr],
            id: tempId
        }, () => {
            this.props.onChange(this.state.current);
        });
    };

    handleChangeValue = (type: any, value: any, index: any) => {
        const temp = JSON.parse(JSON.stringify(this.state.current));
        if (type === 'value') {
            temp[index].props.value = value;
        } else {
            temp[index][type] = value;
        }
        this.setState({
            current: [...temp]
        }, () => {
            this.props.onChange(this.state.current);
        });
    };

    render() {
        const { label, addText } = this.props;
        const { current } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        const formItems = current.map((item, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? label : ''}
                required={false}
                key={item.id || index}
            >
                <Input
                    value={item.label}
                    placeholder="请填写label"
                    style={{ width: '40%', marginRight: 8 }}
                    onChange={(e) => { this.handleChangeValue('label', e.target.value, index); }}
                />
                <Input
                    value={item.props.value}
                    placeholder="请填写value"
                    style={{ width: '40%', marginRight: 8 }}
                    onChange={(e) => { this.handleChangeValue('value', e.target.value, index); }}
                />
                {current.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(index)}
                    />
                ) : null}
            </Form.Item>
        ));
        return (
            <React.Fragment>
                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> {addText}
                    </Button>
                </Form.Item>
            </React.Fragment>
        );
    }
}
