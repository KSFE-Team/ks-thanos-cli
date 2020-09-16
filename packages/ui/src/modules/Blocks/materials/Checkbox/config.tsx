import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Row, Col, Switch, Table, message, Radio } from 'antd';
import { findComponent, saveComponent, checkFieldData } from '../../utils';
import { FORMITEM_LAYOUT, ALIAS, FORM_MESSAGE, ISREQUIRED_TYPE } from '../../constants';
import { initState } from './utils';
import ClearButton from '../ClearButton';
import Icon from '@ant-design/icons';

const VALUE = 'value';
const LABEL = 'label';
const TEXT = 'text';
const CHECK = 'checked';
const DISABLED = 'disabled';
const OPTIONS = 'options';
const KEY = 'key';
const ROW_KEY = 'rowKey';
const ISREQUIRED = 'isRequired';

interface CheckboxConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}

export default class CheckboxConfig extends Component<CheckboxConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state = {
        formData: {
            [OPTIONS]: [{
                props: {
                    [DISABLED]: false,
                    [CHECK]: false,
                    [VALUE]: ''
                },
                [TEXT]: '',
                [ROW_KEY]: 0
            }],
            [LABEL]: '',
            [KEY]: '',
        } as any,
        isTouch: false,
        errMessage: '',
        current: {
            id: '',
            props: {}
        }
    };

    columns = [
        {
            title: '表单项Key',
            dataIndex: 'value',
            key: 'value',
            render: (item: any, record: any, index: any) => <Input
                value={record.props[VALUE]}
                placeholder='例如： 选项'
                onChange={this.handleChange.bind(this, VALUE, index)}
            />
        },
        {
            title: '表单项名称',
            dataIndex: 'text',
            key: 'text',
            render: (item: any, record: any, index: any) => <Input
                value={record[TEXT]}
                placeholder='例如： 姓名'
                onChange={this.handleChange.bind(this, TEXT, index)}
            />
        },
        {
            title: '是否默认选中',
            dataIndex: 'check',
            key: 'check',
            render: (item: any, record: any, index: any) =>
                <Switch
                    checked={record.props[CHECK]}
                    key={record.props[CHECK]}
                    checkedChildren='是'
                    unCheckedChildren='否'
                    onChange={this.handleChange.bind(this, CHECK, index)}
                />
        },
        {
            title: '是否禁用',
            dataIndex: 'disabled',
            key: 'disabled',
            render: (item: any, record: any, index: any) =>
                <Switch
                    checked={record.props[DISABLED]}
                    key={record.props[DISABLED]}
                    checkedChildren='是'
                    unCheckedChildren='否'
                    onChange={this.handleChange.bind(this, DISABLED, index)}
                />
        },
        {
            title: '删除',
            dataIndex: 'delete',
            key: 'delete',
            render: (text: any, record: any, index: any) =>
                this.state.formData.options.length > 1
                    ? <Col>
                        <Icon type='close' onClick={() => { this.handleDeleteChekItem(index); }} />
                    </Col>
                    : <></>

        }
    ];

    static getDerivedStateFromProps(props: any, state: any) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            return {
                formData: {
                    [OPTIONS]: current.options || [{
                        props: {
                            [DISABLED]: false,
                            [CHECK]: false,
                            [VALUE]: ''
                        },
                        [TEXT]: '',
                        [ROW_KEY]: 0
                    }],
                    [LABEL]: current.label || '',
                    [KEY]: current.key || '',
                    [ISREQUIRED]: current[ISREQUIRED],
                },
                current
            };
        } else {
            return state;
        }
    }

    /**
     * @desc 保存修改
     */
    handleSave = () => {
        const { formData, current } = this.state;
        const { pageJSON, onSave } = this.props;
        const { error } = checkFieldData('Checkbox', formData);
        // 提交检验
        if (error) {
            message.error(FORM_MESSAGE + ',' + 'Checkbox组件至少需要一项配置');
            return false;
        }
        pageJSON.components = saveComponent(current.id, pageJSON.components, formData);
        onSave && onSave(pageJSON);
    };

    /**
     * @desc    框内数据发生变化
     */
    handleChange = (itemKey: any, index: number, e: any) => {
        const { formData } = this.state;
        const value = typeof e === 'boolean' ? e : e.target.value;
        switch (itemKey) {
            case LABEL:
            case KEY:
            case ISREQUIRED:
                formData[itemKey] = value;
                break;
            case TEXT:
                formData.options[index][itemKey] = value;
                break;
            case CHECK:
            case DISABLED:
                formData.options[index].props[itemKey] = value;
                break;
            default:
                formData.options[index].props[itemKey] = value;
                break;
        }
        this.setState({
            formData,
            isTouch: true
        });
    };

    /**
     * @desc 添加项
     */
    handleAddCheck = (): void => {
        const { formData } = this.state;
        formData.options.push({
            props: {
                [DISABLED]: false,
                [CHECK]: false,
                [VALUE]: ''
            },
            [TEXT]: '',
            [ROW_KEY]: formData.options[formData.options.length - 1][ROW_KEY] + 1
        });
        this.setState({
            formData,
            isTouch: true
        });
    };

    /**
     * @desc 删除项
     */
    handleDeleteChekItem = (index: any) => {
        const { formData } = this.state;
        formData.options.splice(index, 1);
        this.setState({
            formData
        });
    };

    /**
     * @desc    错误提示关闭
     */
    handleAlertClose = () => {
        this.setState({
            errMessage: ''
        });
    };

    render() {
        const { formData } = this.state;
        return <div>
            <Form.Item
                label={ALIAS.LABEL}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData.label}
                    placeholder='例如： label'
                    onChange={this.handleChange.bind(this, LABEL, 0)}
                />
            </Form.Item>
            <Form.Item
                label={ALIAS.KEY}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData.key}
                    placeholder='例如： key'
                    onChange={this.handleChange.bind(this, KEY, 0)}
                />
            </Form.Item>
            {/* 是否必填/选 */}
            <Form.Item
                {...FORMITEM_LAYOUT}
                label={ALIAS.ISREQUIRED}
                required={true}
            >
                <Radio.Group defaultValue={formData[ISREQUIRED]}
                    onChange={this.handleChange.bind(this, ISREQUIRED, 0)}
                >
                    { ISREQUIRED_TYPE.map(({VALUE, LABEL}, index) => <Radio key={index} value={VALUE}>{LABEL}</Radio>) }
                </Radio.Group>
            </Form.Item>
            <Table rowKey={formData.options[ROW_KEY]} dataSource={formData.options} columns={this.columns} bordered pagination={false} />
            <br />
            <Row justify='space-between'>
                <Col>
                    <Button onClick={this.handleAddCheck} type='primary' >添加项</Button>
                </Col>
                <Col>
                    <Button onClick={this.handleSave} type='primary' >确定</Button>
                </Col>
                <Col>
                    <ClearButton initState={initState} that={this}/>
                </Col>
            </Row>
        </div>;
    }
}
