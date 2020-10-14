/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from 'react';
import { connect, actions } from 'kredux';
import { Row, Button, Col, Input, Pagination, Spin, Empty } from 'antd';
import { goto } from 'Src/utils';
import { STATE } from '../model/index';
import BlockItem from '../../component/BlockItem';
import styles from '../../component/index.module.scss';

const { Search } = Input;

interface ExistingPageProps {
    existingPage: {
        pageList: any[];
        searchPageForm: {
            limit: number;
            page: number;
            total: number;
            totalPage: number;
            pageName: {
                value: string;
            };
        };
        cuPageModalVisible: boolean;
    };
    form: any;
    listLoading: boolean;
}

class ExistingPage extends Component<ExistingPageProps> {
    componentDidMount() {
        // 初始化redux
        const initialState = { ...STATE };
        actions.existingPage.setReducers({
            ...initialState,
        });
        this.loadList();
    }

    handlePageChange = (page: any) => {
        actions.existingPage.setReducers({
            searchPageForm: {
                ...this.props.existingPage.searchPageForm,
                page,
            },
        });
        this.loadList();
    };

    loadList = () => {
        actions.existingPage.getPageList();
    };

    resetPage = (val: any) => {
        this.props.existingPage.searchPageForm.pageName.value = val;
        this.handlePageChange(1);
    };

    reload = () => {
        this.handlePageChange(1);
    };

    render() {
        const { listLoading } = this.props;
        const { pageList = [], searchPageForm } = this.props.existingPage;
        const contents = (
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'column',
                    padding: 24,
                }}
            >
                <Row gutter={[20, 20]}>
                    {pageList.map((item, index) => {
                        return <BlockItem key={index} item={item} />;
                    })}
                </Row>
            </div>
        );
        return (
            <div className="my-page-container">
                <Spin spinning={listLoading}>
                    <Row>
                        <Col span={8} style={{ lineHeight: '32px' }} />
                        <Col span={16} style={{ textAlign: 'right' }}>
                            <Search
                                placeholder="请输入页面名称"
                                style={{ width: 200, marginRight: 10 }}
                                onSearch={this.resetPage}
                            />
                            <Button onClick={this.reload}>刷新</Button>
<<<<<<< HEAD
                            <Button className="mar-l-4">新增</Button>
=======
                            <Button
                                className="mar-l-4"
                                type="primary"
                                onClick={() => {
                                    goto.push('/editor/');
                                }}
                            >
                                新增
                            </Button>
>>>>>>> 554c3836f9b2db3755252734b5d1f267fd94fcaa
                        </Col>
                    </Row>
                    {contents}
                    <Row className={styles.pagination} justify="end">
                        <Pagination
                            size="small"
                            current={searchPageForm.page}
                            onChange={this.handlePageChange}
                            total={searchPageForm.total}
                            pageSize={searchPageForm.limit}
                        />
                    </Row>
                    {pageList.length === 0 && !listLoading ? <Empty description={<span>未搜索到任何数据</span>} /> : ''}
                </Spin>
            </div>
        );
    }
}

export default connect(({ existingPage, loading }: any) => ({
    existingPage,
    listLoading: loading.effects['existingPage/getPageList'],
}))(ExistingPage);