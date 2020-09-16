import React, { Component, Fragment } from 'react';
import { connect, actions } from 'kredux';
import { Table, Button, Modal, Form, Input } from 'antd';
import moment from 'moment';
import { goto } from 'Src/utils';
import SearchForm from 'Src/components/SearchForm';
import { STATE } from '../model/existingPage';
import CuPageModal from './CuPageModal';
// import './style.scss';

interface ExistingPageProps {
    existingPage: {
        pageList: any[];
        searchPageForm: {
            limit: number;
            page: number;
            total: number;
            totalPage: number;
            pageName: {
                value: string
            }
        },
        cuPageModalVisible:boolean
    },
    form: any,
    listLoading: boolean,
}

class ExistingPage extends Component<ExistingPageProps> {

    state = {
        columns: [
            {
                title: '页面名称',
                dataIndex: 'pageName',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                render: (text: any) => {
                    return moment(text).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                render: (text: any) => {
                    return moment(text).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: '操作',
                render: (text: string, record: any) => (
                    <span>
                        <Button type='primary' onClick={() => {
                            goto(`/generatePage/${record.pageName}?pageOrTemp=page&id=${record.id}`);
                        }}>修改</Button>
                        {
                            record.type && +record.type === 1 ? null : <Button
                                className='mar-l-4'
                                danger
                                onClick={() => {
                                    Modal.confirm({
                                        title: `确认删除${record.pageName}？`,
                                        onOk: () => {
                                            actions.existingPage.deletePageItem({
                                                pageName: record.pageName
                                            });
                                        }
                                    });
                                }}
                            >删除</Button>
                        }

                    </span>
                )
            }
        ]
    };

    handlePageChange = (page: any) => {
        actions.existingPage.setReducers({
            searchPageForm: {
                ...this.props.existingPage.searchPageForm,
                page,
            }
        });
        this.loadList();
    };

    loadList = () => {
        actions.existingPage.getPageList();
    };

    resetPage = () => {
        this.handlePageChange(1);
    };

    componentDidMount() {
        // 初始化redux
        const initialState = {...STATE};
        actions.existingPage.setReducers({
            ...initialState,
        });
        this.loadList();
    };

    render() {
        const { listLoading } = this.props;
        const { pageList = [], searchPageForm, cuPageModalVisible } = this.props.existingPage;
        return (
            <div className='my-page-container'>
                <SearchForm
                    form={this.props.form}
                    components={[
                        {
                            title: '页面名称',
                            key: 'pageName',
                            component: <Input
                                placeholder={`请输入页面名称`}
                                onPressEnter={this.resetPage}
                            />
                        }
                    ]}
                    actions={<Fragment>
                        <Button
                            onClick={this.resetPage}
                        >查询</Button>
                        <Button
                            className='mar-l-4'
                            type='primary'
                            onClick={() => {
                                actions.existingPage.setReducers({
                                    cuPageModalVisible: true,
                                });
                            }}
                        >创建页面</Button>
                    </Fragment>}
                />
                <Table
                    columns={this.state.columns}
                    dataSource={pageList}
                    rowKey='pageName'
                    loading={listLoading}
                    pagination={{
                        defaultCurrent: 1,
                        current: searchPageForm.page,
                        pageSize: searchPageForm.limit,
                        total: searchPageForm.total,
                        onChange: this.handlePageChange
                    }}
                />
                {cuPageModalVisible && <CuPageModal/>}
            </div>
        );
    }
}

export default connect(({
    existingPage,
    loading
}: any) => ({
    existingPage,
    listLoading: loading.effects['existingPage/getPageList']
}))(Form.create({
    mapPropsToFields(props: ExistingPageProps) {
        return {
            pageName: Form.createFormField({
                ...props.existingPage.searchPageForm.pageName,
                value: props.existingPage.searchPageForm.pageName.value
            }),
        };
    },
    onFieldsChange(props: ExistingPageProps, fields) {
        actions.existingPage.setReducers({
            searchPageForm: {
                ...props.existingPage.searchPageForm,
                ...fields
            }
        });
    }
})(ExistingPage));
