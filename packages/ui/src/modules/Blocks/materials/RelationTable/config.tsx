import React, { Component } from 'react';
import { actions } from 'kredux';
import { DATA_ENTRY } from '../../materials';
import { Form, Input, Table, Button, Row, Col, Select, message } from 'antd';
import { getUniqueID } from '../../utils';

const Option = Select.Option;
const FormItem = Form.Item;

const EditableContext = React.createContext(null);
const EditableRow = ({ form, index, ...props }: any) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

interface RelationTableConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): any;
}

export default class RelationTableConfig extends Component<RelationTableConfigProps> {

    state = {
        api: '', // api path
        currentComponent: {
            id: '',
            stateName: '',
        }, // current component info
        currentComponentIdx: '', // current component index
        dataSource: [], // table data
        editDataFlag: false,
        method: 'GET', // request method
        // searchComponentChecked: false, // checkbox search component check flag
        tableCount: 0, // table key
    };

    static getDerivedStateFromProps(props: any, state: any) {
        const newState: any = {};
        if (!state.editDataFlag) {
            const currentComponent = props.pageJSON.components.find((item: any, index: any) => {
                if (item.configVisible) {
                    newState.currentComponentIdx = index;
                    newState.editDataFlag = true;
                }
                return item.configVisible;
            });

            if (currentComponent) {
                newState.currentComponent = currentComponent;
                props.pageJSON.components.forEach((item: any) => {
                    if (item.parentId && item.parentId === currentComponent.id) {
                        newState.searchComponentChecked = true;
                    }
                });
                if (state.dataSource.length === 0) {
                    const dataSource = currentComponent.props.columns.filter(({ component }: any) => !component).map((item: any, index: any) => {
                        return {
                            dataKey: item.dataIndex,
                            key: index,
                            tableName: item.title,
                        };
                    });
                    newState.dataSource = dataSource;
                    newState.tableCount = dataSource.length;
                }

                if (!state.api && currentComponent.dependencies && currentComponent.dependencies.api) {
                    newState.api = currentComponent.dependencies.api.value || '';
                }

                if (currentComponent.dependencies.method) {
                    newState.method = currentComponent.dependencies.method;
                }
            }
        }
        return Object.keys(newState).length ? newState : null;
    }

    /**
     * @desc Edit the table automatic save
     * @param { Object } row (current row data)
     */
    handleTableInputSave = (row: any) => {
        interface ItemInterface {
            key: number | string;
        }
        const newData: any[] = [...this.state.dataSource];
        const index = newData.findIndex((item: ItemInterface) => row.key === item.key);
        const item = newData[index];
        const newItem = {...item, ...row};
        newData.splice(index, 1, newItem);
        this.setState({ dataSource: newData });
    };

    /**
     * @desc add one row to the table
     */
    handleAdd = () => {
        let { tableCount, dataSource } = this.state;
        const newData = {
            key: ++tableCount,
            dataKey: '',
            tableName: '',
        };
        this.setState({
            dataSource: [...dataSource, newData],
            tableCount,
        });
    };

    /**
     * @desc delete one row to the table
     * @param { String } key (table key)
     */
    handleTableRowDelete = (key: any) => {
        const dataSource = [...this.state.dataSource];
        interface ItemInterface {
            key: number | string;
        }
        this.setState({ dataSource: dataSource.filter((item: ItemInterface) => item.key !== key) });
    };

    /**
     * @desc save table data
     */
    saveTableData = () => {
        if (!this.checkData()) { return; }
        const pageJSON = this.props.pageJSON;
        const { currentComponent, api, method, dataSource } = this.state;
        pageJSON.components = pageJSON.components.map((item: any) => {
            if (item.configVisible) {
                item.stateName = currentComponent.stateName;
                item.props.columns = dataSource.map((item: any) => ({
                    title: item.tableName,
                    dataIndex: item.dataKey,
                }));

                item.dependencies = {
                    type: 'fetch', // 数据来源类型 fetch 接口， dict 本地字典
                    responseType: 'list', // 接口返回类型， // list 列表， object 对象
                    api: {
                        key: 'query',
                        value: api
                    }, // 接口地址
                    method,
                    actionType: 'get'
                };
            }
            return item;
        });
        this.props.onSave(pageJSON);
    };

    /**
     * @desc check require option
     */
    checkData = () => {
        const { api, method, dataSource, currentComponent } = this.state;
        if (!api) {
            message.error('api不可为空');
            return false;
        } else if (!method) {
            message.error('请求方式不可为空');
            return false;
        } else if (!method) {
            message.error('请求方式不可为空');
            return false;
        } else if (!dataSource.length) {
            message.error('表头数据不能为空');
            return false;
        } else if (!currentComponent.stateName) {
            message.error('表头名称不能为空');
            return false;
        }
        return true;
    };

    /**
     * @desc add a search component
     * @param { Object } e event
     */
    addSearchComponent = (e) => {
        const pageJSON = this.props.pageJSON;
        if (e.target.checked) {
            const { currentComponentIdx, currentComponent } = this.state;
            const InputData = {
                ...DATA_ENTRY.Input.getInitJson(),
                id: getUniqueID(),
                parentId: currentComponent.id,
            };

            pageJSON.components.splice(currentComponentIdx, 0, InputData);

            actions.generatePage.setReducers(pageJSON);
        } else {
            const searchComponentIdx = pageJSON.components.findIndex((item: any) => {
                return item.parentId && item.parentId === this.state.currentComponent.id;
            });
            pageJSON.components.splice(searchComponentIdx, 1);
            actions.generatePage.setReducers(pageJSON);
        }
        this.setState({
            searchComponentChecked: e.target.checked,
        });
    };

    /**
     * @desc method change event
     * @param { String } value
     */
    methodChange = (value: any) => {
        this.setState({
            method: value,
        });
    };

    /**
     * @desc api input change event
     * @param { Object } event
     */
    apiInputChange = (event: any) => {
        const {value} = event.target;
        this.setState({
            api: value,
        });
    };

    /**
     * @desc state name input change event
     * @param { Object } event
     */
    stateNameInputChange = (event: any) => {
        const {value} = event.target;
        const currentComponent = {
            ...this.state.currentComponent,
            stateName: value,
        };
        this.setState({
            currentComponent,
        });
    };

    render() {
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
        };

        const { dataSource } = this.state;
        let columns = [
            {
                title: '表头名称',
                dataIndex: 'tableName',
                editable: true,
            },
            {
                title: '接口字段',
                dataIndex: 'dataKey',
                editable: true,
            },
            {
                title: 'operation',
                render: (text: string, record: any) => {
                    return this.state.dataSource.length >= 2 ? (
                        <div>
                            <Button title='Sure to delete?' danger onClick={() => this.handleTableRowDelete(record.key)}>
                                Delete
                            </Button>
                        </div>

                    ) : null;
                },
            },
        ];
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        columns = columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record: any) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleTableInputSave,
                }),
            };
        });

        return (
            <React.Fragment>
                <FormItem {...formItemLayout} label='接口地址'>
                    <Input value={this.state.api}
                        placeholder='例：/user/list'
                        onChange={this.apiInputChange}/>
                </FormItem>
                <FormItem {...formItemLayout} label='请求方式'>
                    <Select defaultValue={this.state.method} style={{ width: 120 }} onChange={this.methodChange}>
                        <Option value='GET'>GET</Option>
                        <Option value='POST'>POST</Option>
                    </Select>
                </FormItem>
                <FormItem {...formItemLayout} label='表格名称'>
                    <Input value={this.state.currentComponent.stateName}
                        placeholder='组件存储数据Key, 使用英文且唯一'
                        onChange={this.stateNameInputChange}/>
                </FormItem>
                <Table
                    components={components}
                    dataSource={dataSource}
                    bordered={true}
                    columns={columns}
                    pagination={false}
                />
                {/* <Row style={{marginTop: '10px'}} justify='end' gutter={1}>
                    <Checkbox checked={searchComponentChecked} onChange={this.addSearchComponent}>是否拥有条件搜索</Checkbox>
                </Row> */}
                <Row style={{marginTop: '20px'}} justify='end' gutter={1}>
                    <Col>
                        <Button onClick={this.handleAdd} type='primary' style={{ marginBottom: 16 }}>
                            Add a row
                        </Button>
                    </Col>
                    <Col offset={1}>
                        <Button type='primary' onClick={this.saveTableData}>
                            确定
                        </Button>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

interface EditableCellProps {
    record: any;
    dataIndex: number;
    title: string;
    editable: boolean;
    index: number;
    handleSave(params: any): void;
}

class EditableCell extends React.Component<EditableCellProps> {
    state = {
        editing: false,
    };

    input: any;

    form: any;

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = (e) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error: any, values: any) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = (form: any) => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={(node) => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
            <div
                className='editable-cell-value-wrap'
                style={{ paddingRight: 24, minHeight: '21px' }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };

    render() {
        const {
            editable,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}
