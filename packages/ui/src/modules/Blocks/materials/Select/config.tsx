import React, { Component } from 'react';
import ConfigItem from './ConfigItem';
import DynamicConfigItem from './DynamicConfigItem';
import { Form, Input, Button, Row, Col, Card, message, Radio } from 'antd';
import { ALIAS, FORMITEM_LAYOUT, FORM_MESSAGE, ISREQUIRED_TYPE } from '../../constants';
import { findComponent, saveComponent, checkFieldData } from '../../utils';
import { initState } from './utils';
import ClearButton from '../ClearButton';

const FormItem = Form.Item;

const KEY = 'key';
const LABEL = 'label';
const ISREQUIRED = 'isRequired';

interface ConfigProps {
    form: any;
    pageJSON: any;
    onSave(pageJSON: any): void;
}

interface ConfigState {
    formData: any;
    isTouch: boolean;
    current: any;
}

const selectProps = [
    {
        name: 'placeholder',
        label: ALIAS.PLACEHOLDER,
        type: 'input',
        placeholder: '例如：请选择订单类型'
    },
    {
        name: 'allowClear',
        label: '允许清空',
        type: 'boolean'
    },
    {
        name: 'disabled',
        label: '是否禁用',
        type: 'boolean'
    },
    {
        name: 'showSearch',
        label: '展示搜索',
        type: 'boolean'
    }
];

class Config extends Component<ConfigProps, ConfigState> {

    constructor(props: any) {
        super(props);

        this.state = initState;
    }

    static getDerivedStateFromProps(props: any, state: any) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            return {
                formData: {
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL],
                    props: current.props,
                    options: current.options,
                    [ISREQUIRED]: current[ISREQUIRED],
                },
                current
            };
        } else {
            return state;
        }
    }

    handleSave = () => {
        const { error } = checkFieldData('Select', this.state.formData);
        if (error) {
            message.error(FORM_MESSAGE + ',' + 'Select组件至少需要一个Option配置');
            return false;
        }
        const { current } = this.state;
        const { formData, formData: { props: fieldProps, options } } = this.state;
        const { pageJSON, onSave } = this.props;
        pageJSON.components = saveComponent(current.id, pageJSON.components, {
            key: formData.key,
            label: formData.label || '',
            isRequired: formData.isRequired,
            defaultValue: formData.defaultValue || '',
            props: {
                ...fieldProps
            },
            options
        });
        onSave && onSave(pageJSON);
    };

    handleChangeValue = (value: any, key: any) => {
        const { formData } = this.state;
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
        const { form } = this.props;
        return <div>
            <FormItem
                label={ALIAS.KEY}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    placeholder='例如： orderType'
                    value={formData[KEY]}
                    onChange={(e) => { this.handleChangeValue(e.target.value, KEY); }}
                />
            </FormItem>
            <FormItem
                label={ALIAS.LABEL}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    placeholder='例如： 订单类型'
                    value={formData[LABEL]}
                    onChange={(e) => { this.handleChangeValue(e.target.value, LABEL); }}
                />
            </FormItem>
            {/* 是否必填/选 */}
            <Form.Item
                {...FORMITEM_LAYOUT}
                label={ALIAS.ISREQUIRED}
                required={true}
            >
                <Radio.Group defaultValue={formData[ISREQUIRED]}
                    onChange={(e) => { this.handleChangeValue(e.target.value, ISREQUIRED); }}
                >
                    { ISREQUIRED_TYPE.map(({VALUE, LABEL}, index) => <Radio key={index} value={VALUE}>{LABEL}</Radio>) }
                </Radio.Group>
            </Form.Item>
            <Card title='Select Props 配置'>
                {
                    selectProps.map((item, index) => {
                        const { type, name, label, ...otherProps } = item;
                        return (
                            <ConfigItem
                                key={index}
                                type={type}
                                name={name}
                                label={label}
                                defaultValue={formData.props ? formData.props[item.name] : undefined}
                                form={form}
                                formItemLayout={FORMITEM_LAYOUT}
                                {...otherProps}
                                onChange={(value: any) => {
                                    this.setState({
                                        formData: {
                                            ...formData,
                                            props: {
                                                ...formData.props,
                                                ...value
                                            }
                                        },
                                        isTouch: true
                                    });
                                }}
                                prevdata={formData.props}
                            />
                        );
                    })
                }
            </Card>
            <Card title='Option 配置'>
                <DynamicConfigItem
                    form={form}
                    name='options'
                    label='下拉选项'
                    addText='添加选项'
                    defaultValue={formData.options || []}
                    onChange={(value: any) => {
                        this.setState({
                            formData: {
                                ...formData,
                                options: value.map((item) => {
                                    return {
                                        label: item.label,
                                        props: {
                                            value: item.props.value
                                        }
                                    };
                                })
                            },
                            isTouch: true
                        });
                    }}
                />
            </Card>
            <FormItem>
                <Row>
                    <Col>
                        <Button
                            onClick={this.handleSave}
                            type='primary'
                        >确定</Button>
                    </Col>
                    <ClearButton initState={initState} that={this} type='Select' />
                </Row>
            </FormItem>
        </div>;
    }
}

// @ts-ignore
export default Form.create<ConfigProps>()(Config);
