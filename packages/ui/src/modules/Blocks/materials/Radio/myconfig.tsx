import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Input, message, Radio } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    }
};
const formItemLayoutRadio = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 },
    }
};

const KEY = 'key';
const LABEL = 'label';
const VALUE = 'value';

interface RadioConfigProps{
    onSave(pageJSON:any): void,
    pageJSON: any,
    isRequired:boolean
}

export default class RadioConfig extends Component<RadioConfigProps> {
    static propTypes = {
        onSave: PropTypes.func,
        form: PropTypes.object
    };

    state={
        formData: {

        },
        isTouch: false,
        choiceNodeList: [{ id: 1}, { id: 2}],
        choiceNodeId: 2,
        defaultValue: 1,
        isRequired: true,
    };

    key: any;
    label: any;

    static getDerivedStateFromProps(props: any, state: any) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = components.find(({ configVisible }: any) => configVisible);
            const index = current.props.configList.length - 1;
            if (!current.key) {
                current.key = 'status';
            }
            if (!current.label) {
                current.label = '状态';
            }
            return {
                choiceNodeList: [...current.props.configList],
                choiceNodeId: current.props.configList[index].id,
                formData: {
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL]
                }
            };
        } else {
            return state;
        }
    }

    handleSave = () => {
        const { formData, choiceNodeList, isRequired, defaultValue } = this.state;
        const { pageJSON, onSave } = this.props;
        if (!this.key.state.value) {
            message.error('表单项Key不可为空');
            return;
        } else if (!this.label.state.value) {
            message.error('表单项名称不可为空');
            return;
        }

        const length = choiceNodeList.filter((item:any, index:number) => {
            return !this[`label${index}`].state.value || this[`value${index}`].state.value === undefined || this[`value${index}`].state.value === '';
        }).length;
        if (length > 0) {
            message.error('选项不可为空');
            return;
        }
        const array:Array<any> = [];
        this.state.choiceNodeList.forEach((item, index) => {
            array.push({
                id: item.id,
                label: this[`label${index}`].state.value,
                value: isNaN(this[`value${index}`].state.value) ? this[`value${index}`].state.value : this[`value${index}`].state.value * 1
            });
        });

        pageJSON.components = pageJSON.components.map((component) => {
            if (component.configVisible) {
                component = {
                    ...component,
                    ...formData,
                    isRequired: isRequired,
                    props: {
                        ...component.props,
                        configList: array,
                        label: this.label.state.value,
                        defaultValue: isRequired ? isNaN(defaultValue) ? defaultValue : defaultValue * 1 : undefined,
                    }
                };
            }
            return component;
        });
        onSave && onSave(pageJSON);
    };

    handleChange = (key: any, e: any) => {
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

    handleChangeChoice = (key: any, index: any, e: any) => {
        const { choiceNodeList } = this.state;
        const value = e.target.value;
        choiceNodeList[index][key] = value;
        this.setState({
            choiceNodeList
        });
    };

    render() {
        const { formData, choiceNodeId, choiceNodeList, isRequired } = this.state;
        return <div>
            <FormItem
                label={'表单项Key'}
                {...formItemLayout}
            >
                <Input
                    value={formData[KEY]}
                    placeholder='例如: status'
                    ref={(ref) => {
                        this.key = ref;
                    }}
                    onChange={this.handleChange.bind(this, KEY)}
                />
            </FormItem>
            <FormItem
                label={'表单项名称'}
                {...formItemLayout}
            >
                <Input
                    value={formData[LABEL]}
                    placeholder='例如: 状态'
                    ref={(ref) => {
                        this.label = ref;
                    }}
                    onChange={this.handleChange.bind(this, LABEL)}
                />
            </FormItem>
            <div>
                {
                    choiceNodeList && choiceNodeList.map((item: any, index) => {
                        return (
                            <Row key={item.id} type='flex'>
                                <Col span={10}>
                                    <FormItem
                                        label={`选项Label${index + 1}`}
                                        {...formItemLayoutRadio}
                                    >
                                        <Input
                                            value={item.label}
                                            ref={(ref) => {
                                                this[`label${index}`] = ref;
                                            }}
                                            placeholder='启用'
                                            onChange={this.handleChangeChoice.bind(this, LABEL, index)}

                                        />
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem
                                        label={`选项value${index + 1}`}
                                        {...formItemLayoutRadio}
                                    >
                                        <Input
                                            value={item.value}
                                            placeholder={'请填入值'}
                                            ref={(ref) => {
                                                this[`value${index}`] = ref;
                                            }}
                                            onChange={this.handleChangeChoice.bind(this, VALUE, index)}
                                        />
                                    </FormItem>

                                </Col>
                                {
                                    (index + 1) !== choiceNodeList.length && choiceNodeList.length > 2 && <React.Fragment>
                                        <Col span={2}>
                                            <Button shape='circle' size='small' icon='minus' onClick={() => {
                                                const tempNodeList = [...choiceNodeList];
                                                tempNodeList.splice(index, 1);
                                                this.setState({
                                                    choiceNodeList: tempNodeList,
                                                    isTouch: true
                                                });
                                            }}/>
                                        </Col>
                                    </React.Fragment>
                                }
                                {
                                    (index + 1) === choiceNodeList.length && <React.Fragment>
                                        <Col span={2}>
                                            <Button shape='circle' size='small' icon='plus' onClick={() => {
                                                // const tempNodeList = [...choiceNodeList, { id: choiceNodeId + 1 }];
                                                this.setState({
                                                    choiceNodeList: [...choiceNodeList, { id: choiceNodeId + 1 }],
                                                    choiceNodeId: choiceNodeId + 1,
                                                    isTouch: true
                                                });
                                            }}/>
                                            {
                                                choiceNodeList.length && choiceNodeList.length > 2 && <Button className='mar-l-4' shape='circle' size='small' icon='minus' onClick={() => {
                                                    const tempNodeList = [...choiceNodeList];
                                                    tempNodeList.splice(index, 1);
                                                    this.setState({
                                                        choiceNodeList: tempNodeList,
                                                        isTouch: true
                                                    });
                                                }}/>
                                            }
                                        </Col>
                                    </React.Fragment>
                                }
                            </Row>
                        );
                    })
                }
            </div>
            <FormItem
            >
                <Row type='flex' align='middle'>
                    <Col>
                        <Button
                            onClick={this.handleSave}
                            type='primary'
                        >确定</Button>
                    </Col>
                    <Col span={6} style={{marginLeft: '10px'}}>
                        <Radio.Group style={{display: 'flex', alignItems: 'center'}} defaultValue={isRequired} onChange={(e) => {
                            this.setState({
                                isRequired: e.target.value
                            });
                        }}>
                            <Radio value={true}>必填</Radio>
                            <Radio value={false}>非必填</Radio>
                        </Radio.Group>
                    </Col>
                    {isRequired && <Col span={5} style={{marginLeft: '10px'}}>
                        <Input placeholder='默认选中value1' onChange={(e) => {
                            this.setState({
                                defaultValue: e.target.value
                            });
                        }}/>
                    </Col>}
                </Row>
            </FormItem>
        </div>;
    }
}
