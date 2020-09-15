import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Row, Col, message, Select } from 'antd';
import { ALIAS, FORMITEM_LAYOUT, FORM_MESSAGE } from '../../constants';
import { findComponent, saveComponent, checkFieldData } from '../../utils';
import { initState, DEFAULT_OPTIONS } from './utils';
import ClearButton from '../ClearButton';

const FormItem = Form.Item;

const KEY = 'key';
const LABEL = 'label';
const TYPE = 'type';

interface BizSelectModalConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}

export default class BizSelectModalConfig extends Component<BizSelectModalConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    static getDerivedStateFromProps(props: any, state: any) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            const { type = '' } = (current.props || {});
            return {
                formData: {
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL],
                    [TYPE]: type,
                },
                current
            };
        } else {
            return state;
        }
    }

    state = initState;

    handleSave = () => {
        const { formData, current } = this.state;
        const { pageJSON, onSave } = this.props;
        const { type, ...OTHER_DATA } = formData;
        const { error } = checkFieldData('BizSelectModal', formData);
        if (error) {
            message.error(FORM_MESSAGE);
            return false;
        }
        pageJSON.components = saveComponent(current.id, pageJSON.components, {
            ...OTHER_DATA,
            props: {
                ...current.props,
                placeholder: formData[LABEL],
                [TYPE]: type
            },
        });
        onSave && onSave(pageJSON);
    };

    handleChange = (key: string, value: string) => {
        const { formData } = this.state;
        this.setState({
            formData: {
                ...formData,
                [key]: value
            },
            isTouch: true
        });
    };

    handleSearch = (searchValue: string) => {
        if (DEFAULT_OPTIONS.find(({
            value
        }) => value.toLowerCase() === searchValue.toLowerCase())) {
            this.setState({
                inputType: ''
            });
        } else {
            this.setState({
                inputType: searchValue
            });
        }
    };

    render() {
        const { formData, inputType } = this.state;
        return <div>
            <FormItem
                label={ALIAS.LABEL}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData[LABEL]}
                    placeholder='例如： 姓名'
                    onChange={(event) => {
                        this.handleChange(LABEL, event.target.value);
                    }}
                />
            </FormItem>
            <FormItem
                label={ALIAS.KEY}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData[KEY]}
                    placeholder='例如： name'
                    onChange={(event) => {
                        this.handleChange(KEY, event.target.value);
                    }}
                />
            </FormItem>
            <FormItem
                label={ALIAS.TYPE}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Select
                    style={{
                        width: '100%'
                    }}
                    showSearch
                    value={formData[TYPE]}
                    onSearch={this.handleSearch.bind(this)}
                    onChange={(value: string) => {
                        this.handleChange(TYPE, value);
                    }}
                    filterOption={(input: any, option: any) =>
                        String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        inputType ? <Select.Option value={inputType}>{inputType}</Select.Option> : null
                    }
                    {
                        DEFAULT_OPTIONS.map((option, index) => (
                            <Select.Option key={index} value={option.value}>
                                {option.name}({option.value})
                            </Select.Option>
                        ))
                    }
                </Select>
            </FormItem>
            <FormItem>
                <Row>
                    <Col>
                        <Button
                            onClick={this.handleSave}
                            type='primary'
                        >确定</Button>
                    </Col>
                    <ClearButton initState={initState} that={this} />
                </Row>
            </FormItem>
        </div>;
    }
}
