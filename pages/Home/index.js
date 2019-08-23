
import { Form, Input, Row, Col, Table, Form } from 'antd';
import { connect } from 'kredux';

@Form.create({
    mapPropsToFields(props) { 
        return {
            name: Form.createFormField({
                ...props.home.table.name,
                value: props.home.table.name.value
            }),
        };
    },
    onFieldsChange(props, fields) {
        actions.home.setReducer({
            table: {
                ...props.home.table,
                ...fields
            }
        });
    }
})
@connect((
    { 
        home,
        loading
    }
) => ({
    home,
    tableListLoading: loading.effects['home/loadTableList']   
}))
export default class Home extends React.Component {
    
    tableReset() {
        actions.home.setReducers({
            table: {
                ...this.props.home.table,
                page: 1
            }
        });
        this.loadTableList();
    }
            

    loadTableList() {
        actions.home.loadTableList();
    }
        

    onPageChange(page, pageSize) {
        actions.home.setReducers({
            table: {
                ...this.props.home.table,
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
                        dataSource={this.props.home.table.list}
                        loading={this.props.home.tableListLoading}
                        pagination={{
                            current: this.props.home.table.page,
                            pageSize: this.props.home.table.limit,
                            total: this.props.home.table.total,
                            onChange: this.onPageChange
                        }}
                    />
                </React.Fragment>
            </React.Fragment>
        );
    }
}
