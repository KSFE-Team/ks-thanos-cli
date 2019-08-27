
import { Form, Input, Row, Col, Table, Form } from 'antd';
import { connect } from 'kredux';

@Form.create({
    mapPropsToFields(props) { 
        return {
            name: Form.createFormField({
                ...props.test.table.name,
                value: props.test.table.name.value
            }),
        };
    },
    onFieldsChange(props, fields) {
        actions.test.setReducer({
            table: {
                ...props.test.table,
                ...fields
            }
        });
    }
})
@connect((
    { 
        test,
        loading
    }
) => ({
    test,
    tableListLoading: loading.effects['test/loadTableList']   
}))
export default class Test extends React.Component {
    
    tableReset() {
        actions.test.setReducers({
            table: {
                ...this.props.test.table,
                page: 1
            }
        });
        this.loadTableList();
    }
            

    loadTableList() {
        actions.test.loadTableList();
    }
        

    onPageChange(page, pageSize) {
        actions.test.setReducers({
            table: {
                ...this.props.test.table,
                page,
                limit: pageSize
            }
        });
        this.loadTableList();
    }
        
    componentDidMount() {
        this.loadTableList();
    }

    render() {
        return (
            <React.Fragment>
                <Form>
                    <Row>
                        <Col span={3}>
                            <Form.Item>
                                {
                                    this.props.form.getFieldDecorator('名字')(
                                        <Input
                                            placeholder={'名字'}
                                        />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <React.Fragment>
                    <Table
                        columns={[
                            {
                                title: '示例',
                                dataIndex: 'example'
                            },
                            {
                                title: '名字',
                                dataIndex: 'name'
                            },
                            {
                                title: '操作',
                                render: (text, record) => {
                                    return (
                                        <div>
                        
                                            <a
                                                onClick={() => {
                                                    window.location.href = 'http://www.baidu.com';
                                                }}
                                            >跳转</a>
        
                                        </div>
                                    );
                                }
                            }
                        ]}
                        rowKey={'id'}
                        dataSource={this.props.test.table.list}
                        loading={this.props.test.tableListLoading}
                        pagination={{
                            current: this.props.test.table.page,
                            pageSize: this.props.test.table.limit,
                            total: this.props.test.table.total,
                            onChange: this.onPageChange
                        }}
                    />
                </React.Fragment>
            </React.Fragment>
        );
    }
}
