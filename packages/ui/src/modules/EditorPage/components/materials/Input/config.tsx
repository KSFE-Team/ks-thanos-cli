import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, message, Radio } from 'antd';
import PropTypes from 'prop-types';
import { ALIAS, FORMITEM_LAYOUT, FORM_MESSAGE, ISREQUIRED_TYPE } from 'Src/utils/constants';
import { findComponent, saveComponent } from 'Src/utils';
import { checkFieldData } from 'Src/utils/utils';
import ClearButton from 'Src/components/ClearButton';
import { initState } from './utils';

const FormItem = Form.Item;
const KEY = 'key';
const LABEL = 'label';
const ISREQUIRED = 'isRequired';

interface InputConfigProps{
    pageJSON: any;
    onSave(pageJSON: any): void;
}

export default class InputConfig extends Component<InputConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state=initState

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            return {
                formData: {
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL],
                    [ISREQUIRED]: current[ISREQUIRED],
                },
                current
            };
        } else {
            return state;
        }
    }

    handleSave = () => {
        const { formData, current } = this.state;
        const { pageJSON, onSave } = this.props;
        const { error } = checkFieldData('Input', formData);
        // 提交检验
        if (error) {
            message.error(FORM_MESSAGE);
            return false;
        }
        pageJSON.components = saveComponent(current.id, pageJSON.components, {
            ...formData,
            props: {
                ...current.props,
                placeholder: formData[LABEL]
            }
        });
        onSave && onSave(pageJSON);
    }

    handleChange = (key: string, e: any) => {
        const { formData } = this.state;
        const value = e.target.value;
        this.setState({
            formData: {
                ...formData,
                [key]: value
            },
            isTouch: true
        });
    };

    render() {
        const { formData } = this.state;
        return <div>
            <FormItem
                label={ALIAS.KEY}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData[KEY]}
                    placeholder='例如： name'
                    onChange={this.handleChange.bind(this, KEY)}
                />
            </FormItem>
            <FormItem
                label={ALIAS.LABEL}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData[LABEL]}
                    placeholder='例如： 姓名'
                    onChange={this.handleChange.bind(this, LABEL)}
                />
            </FormItem>
            {/* 是否必填/选 */}
            <Form.Item
                {...FORMITEM_LAYOUT}
                label={ALIAS.ISREQUIRED}
                required={true}
            >
                <Radio.Group defaultValue={formData[ISREQUIRED]}
                    onChange={this.handleChange.bind(this, ISREQUIRED)}
                >
                    { ISREQUIRED_TYPE.map(({VALUE, LABEL}, index) => <Radio key={index} value={VALUE}>{LABEL}</Radio>) }
                </Radio.Group>
            </Form.Item>
            <FormItem>
                <Row>
                    <Col>
                        <Button
                            onClick={this.handleSave}
                            type='primary'
                        >确定</Button>
                    </Col>
                    <ClearButton initState={initState} that={this}/>
                </Row>
            </FormItem>
        </div>;
    }
}
