import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Radio, Button, Row, Col, Input, message} from 'antd';
import { ALIAS, FORMITEM_LAYOUT, FORM_MESSAGE, ISREQUIRED_TYPE } from '../../constants';
import { findComponent, saveComponent, checkFieldData } from '../../utils';
import ClearButton from '../ClearButton';
import { initState } from './utils';

const FormItem = Form.Item;

const PLACEHOLDER = 'placeholder';
const FORMAT = 'format';
const SHOW_TIME = 'showTime';
const KEY = 'key';
const LABEL = 'label';
const ISREQUIRED = 'isRequired';

interface ConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}

export default class Config extends Component<ConfigProps> {
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
                [KEY]: current[KEY],
                [LABEL]: current[LABEL],
                [PLACEHOLDER]: current[PLACEHOLDER],
                [ISREQUIRED]: current[ISREQUIRED],
                current
            };
        } else {
            return state;
        }
    }

    handleSave = () => {
        const { placeholder, showTime, format, key, label, current, isRequired } = this.state;
        const {pageJSON, onSave} = this.props;
        const { error } = checkFieldData('DatePicker', {key, label});
        // 提交检验
        if (error) {
            message.error(FORM_MESSAGE);
            return false;
        }
        pageJSON.components = saveComponent(current.id, pageJSON.components, {
            [KEY]: key,
            [LABEL]: label,
            [PLACEHOLDER]: placeholder,
            [ISREQUIRED]: isRequired,
            props: {
                ...current.props,
                [PLACEHOLDER]: placeholder,
                [SHOW_TIME]: showTime,
                [FORMAT]: format,
            }
        });
        onSave && onSave(pageJSON);
    };

    handleChange = (key: string, e: any) => {
        const value = e.target.value;
        this.setState({
            [key]: value,
            isTouch: true
        });
    };

    render() {
        const {placeholder, format, showTime, key, label, isRequired} = this.state;
        return <div>
            <FormItem
                label={ALIAS.KEY}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={key}
                    placeholder='例如： name'
                    onChange={this.handleChange.bind(this, KEY)}
                />
            </FormItem>
            <Form.Item
                {...FORMITEM_LAYOUT}
                label={ALIAS.LABEL}
                required={true}
            >
                <Input
                    value={label}
                    placeholder='例如： label'
                    onChange={this.handleChange.bind(this, LABEL)}
                />
            </Form.Item>
            <FormItem
                label='是否可选时间'
                {...FORMITEM_LAYOUT}
            >
                <Radio.Group onChange={this.handleChange.bind(this, SHOW_TIME)} value={showTime}>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                </Radio.Group>
            </FormItem>
            <FormItem
                label={ALIAS.PLACEHOLDER}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    value={placeholder}
                    onChange={this.handleChange.bind(this, PLACEHOLDER)}
                />
            </FormItem>
            <FormItem
                label={'日期格式'}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    value={format}
                    placeholder='YYYY-MM-DD HH:mm:ss'
                    onChange={this.handleChange.bind(this, FORMAT)}
                />
            </FormItem>
            {/* 是否必填/选 */}
            <Form.Item
                {...FORMITEM_LAYOUT}
                label={ALIAS.ISREQUIRED}
                required={true}
            >
                <Radio.Group defaultValue={isRequired}
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
                    <ClearButton initState={initState} that={this} />
                </Row>
            </FormItem>
        </div>;
    }
}
