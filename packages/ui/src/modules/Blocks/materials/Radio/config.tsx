import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Row, Col, Switch, Table, Form, Select, message, Radio } from 'antd';
import {FORMITEM_LAYOUT, ALIAS, FORM_MESSAGE, ISREQUIRED_TYPE } from '../../constants';
import { findComponent, saveComponent, getFragments, checkFieldData } from '../../utils';
import ClearButton from '../ClearButton';
import { initState } from './utils';
import Icon from '@ant-design/icons';

const Option = Select.Option;

const VALUE = 'value';
const LABEL = 'label';
const TEXT = 'text';
const DISABLED = 'disabled';
const OPTIONS = 'options';
const SELECT = 'fragmentId';
const KEY = 'key';
const ROW_KEY = 'rowKey';
const ISREQUIRED = 'isRequired';
const DEFAULTVALUE = 'defaultValue';

interface RadioConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}
export default class RadioConfig extends Component<RadioConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state = initState;

    columns = [
        {
            title: '表单项Key',
            dataIndex: 'value',
            key: 'value',
            render: (item: any, record: any, index: any) => <Input
                value={record[VALUE]}
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
            title: '区域块',
            dataIndex: 'fragmentName',
            key: 'fragmentName',
            width: 100,
            render: (item: any, record: any, index: any) => <Select
                allowClear={true}
                style={{ width: '100%' }}
                value={record[SELECT]}
                onChange={this.handleChange.bind(this, SELECT, index)}
            >
                {
                    this.state.selectOption.length > 0 && this.state.selectOption.map((item:any, ind) => {
                        return <Option key={ind} value={item.fragmentId}>{item.fragmentName}</Option>;
                    })
                }
            </Select>
        },
        {
            title: '是否禁用',
            dataIndex: 'disabled',
            key: 'disabled',
            render: (item: any, record: any, index: any) =>
                <Switch
                    defaultChecked={record[DISABLED]}
                    key={record[DISABLED]}
                    checkedChildren='是'
                    unCheckedChildren='否'
                    onChange={this.handleChange.bind(this, DISABLED, index)}
                />
        },
        {
            title: '删除',
            dataIndex: 'delete',
            key: 'delete',
            render: (item: any, record: any, index: any) =>
                this.state.formData.options.length > 1
                    ? <Col>
                        <Icon type='close' onClick={() => { this.handleDeleteRadioItem(index); }} />
                    </Col>
                    : <></>

        }
    ];

    static getDerivedStateFromProps(props: any, state: any) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            const fragment = getFragments(current.id, props.pageJSON.components);
            return {
                formData: {
                    [OPTIONS]: current[OPTIONS] || [{
                        [DISABLED]: false,
                        [VALUE]: '',
                        [TEXT]: '',
                        [ROW_KEY]: 0,
                        [SELECT]: ''
                    }],
                    [LABEL]: current[LABEL] || '',
                    [KEY]: current[KEY] || '',
                    [ISREQUIRED]: current[ISREQUIRED],
                    [DEFAULTVALUE]: current[DEFAULTVALUE]
                },
                current,
                selectOption: fragment.map((item) => {
                    return {
                        fragmentName: item.fragmentName,
                        fragmentId: item.id
                    };
                })
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
        const { error } = checkFieldData('Radio', formData);
        // 提交检验
        if (error) {
            message.error(FORM_MESSAGE + ',' + 'Radio组件最少需要一组配置信息');
            return false;
        }
        this.setState({
            isTouch: true,
        });
        pageJSON.components = saveComponent(current.id, pageJSON.components, formData);
        onSave && onSave(pageJSON);
    };

    /**
     * @desc    框内数据发生变化
     */
    handleChange = (itemKey: any, index: number, e: any) => {
        const { formData } = this.state;
        const value = typeof e === 'object' ? e.target.value : e;
        switch (itemKey) {
            case LABEL:
            case KEY:
            case ISREQUIRED:
                formData[itemKey] = value;
                break;
            case DEFAULTVALUE:
                formData[itemKey] = formData[ISREQUIRED] ? value : '';
                break;
            default:
                formData.options[index][itemKey] = value;
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
    handleAddRadioItem = (): void => {
        const { formData } = this.state;
        formData.options.push({
            [DISABLED]: false,
            [VALUE]: '',
            [TEXT]: '',
            [ROW_KEY]: formData.options[formData.options.length - 1][ROW_KEY] + 1,
            [SELECT]: ''
        });
        this.setState({
            formData,
            isTouch: true
        });
    };

    /**
     * @desc 删除项
     */
    handleDeleteRadioItem = (index: any) => {
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
                {...FORMITEM_LAYOUT}
                label={ALIAS.LABEL}
                required={true}
            >
                <Input
                    value={formData[LABEL]}
                    placeholder='例如： label'
                    onChange={this.handleChange.bind(this, LABEL, 0)}
                />
            </Form.Item>
            <Form.Item
                {...FORMITEM_LAYOUT}
                label={ALIAS.KEY}
                required={true}
            >
                <Input
                    value={formData[KEY]}
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
            {/* 必填/选 默认值 */}
            {formData.isRequired && <Form.Item
                {...FORMITEM_LAYOUT}
                label={ALIAS.DEFAULTVALUE}
                required={false}
            >
                <Input defaultValue={formData[DEFAULTVALUE] || '1'}
                    onChange={this.handleChange.bind(this, DEFAULTVALUE, 0)}
                />
            </Form.Item>}
            <Table rowKey='rowKey' dataSource={formData.options} columns={this.columns} bordered pagination={false} />
            <br />
            <Row type='flex' justify='space-between'>
                <Col>
                    <Button onClick={this.handleAddRadioItem} type='primary' >添加项</Button>
                </Col>
                <Col>
                    <Button onClick={this.handleSave} type='primary' >确定</Button>
                </Col>
                <ClearButton initState={initState} that={this}/>
            </Row>
        </div>;
    }
}
