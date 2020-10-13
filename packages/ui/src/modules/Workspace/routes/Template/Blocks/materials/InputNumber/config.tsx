import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Row, Col, message, Radio } from 'antd';
import { ALIAS, FORMITEM_LAYOUT, FORM_MESSAGE, ISREQUIRED_TYPE } from '../../constants';
import { findComponent, saveComponent, checkFieldData } from '../../utils';
import ClearButton from '../ClearButton';
import { initState } from './utils';

const FormItem = Form.Item;

const LABEL = 'label';
const DEFAULT_VALUE = 'initialValue';
const PLACEHOLDER = 'placeholder';
const MIN_VALUE = 'min';
const MAX_VALUE = 'max';
const KEY = 'key';
const ISREQUIRED = 'isRequired';
const DEFAULTVALUE = 'defaultValue';

interface InputConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}

class InputNumberConfig extends Component<InputConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state = initState;

    static getDerivedStateFromProps(props: any, state: any) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            return {
                formData: {
                    ...current.props,
                    [DEFAULT_VALUE]: current[DEFAULT_VALUE],
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
        const { formData } = this.state;
        if (formData[MIN_VALUE] > formData[MAX_VALUE]) {
            message.error('最小值不能大于最大值！');
            return;
        }
        const { current } = this.state;
        const { pageJSON, onSave } = this.props;
        const key = formData[KEY];
        const label = formData[LABEL];
        const initialValue = formData[DEFAULT_VALUE];
        const isRequired = formData[ISREQUIRED];
        const defaultValue = initState.formData[DEFAULTVALUE];

        delete formData[KEY];
        delete formData[LABEL];
        delete formData[DEFAULT_VALUE];
        for (const key in formData) {
            if (!formData[key] && formData[key] !== 0) {
                delete formData[key];
            }
        }
        const { error } = checkFieldData('InputNumber', { key, label });
        if (error) {
            message.error(FORM_MESSAGE);
            return false;
        }
        pageJSON.components = saveComponent(current.id, pageJSON.components, {
            [KEY]: key,
            [LABEL]: label,
            [DEFAULT_VALUE]: initialValue,
            [ISREQUIRED]: isRequired,
            [DEFAULTVALUE]: defaultValue,
            props: {
                ...current.props,
                placeholder: formData[PLACEHOLDER]
            }
        });

        onSave && onSave(pageJSON);
    };

    handleChangeValue = (type: any, value: any) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [type]: value
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
                    placeholder='例如:inputnumber'
                    value={formData[KEY] || ''}
                    onChange={(e) => { this.handleChangeValue(KEY, e.target.value); }}
                />
            </FormItem>
            <FormItem
                label={ALIAS.LABEL}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    placeholder='例如:inputnumber'
                    value={formData[LABEL]}
                    onChange={(e) => { this.handleChangeValue(LABEL, e.target.value); }}
                />
            </FormItem>
            <FormItem
                label={ALIAS.PLACEHOLDER}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    placeholder='例如:inputnumber'
                    value={formData[PLACEHOLDER]}
                    onChange={(e) => { this.handleChangeValue(PLACEHOLDER, e.target.value); }}
                />
            </FormItem>
            <Form.Item
                {...FORMITEM_LAYOUT}
                label={ALIAS.ISREQUIRED}
                required={true}
            >
                <Radio.Group defaultValue={formData[ISREQUIRED]}
                    onChange={(e) => { this.handleChangeValue(ISREQUIRED, e.target.value); }}
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
                    <ClearButton initState={initState} that={this} type='InputNumber' />
                </Row>
            </FormItem>
        </div>;
    }
}

// @ts-ignore
export default Form.create<InputConfigProps>()(InputNumberConfig);
