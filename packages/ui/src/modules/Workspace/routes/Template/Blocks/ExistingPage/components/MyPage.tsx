/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from 'react';
import { connect, actions } from 'kredux';
import { Row, Button, Col, Input, Pagination, Spin } from 'antd';
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

    resetPage = () => {
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
                <Row gutter={[20, 20]} type="flex">
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
                            <Search placeholder="input search text" style={{ width: 200, marginRight: 10 }} />
                            <Button>刷新</Button>
                            <Button>新增</Button>
                        </Col>
                    </Row>
                    {contents}
                    <Row className={styles.pagination} type="flex" justify="end">
                        <Pagination
                            size="small"
                            current={searchPageForm.page}
                            onChange={this.handlePageChange}
                            total={searchPageForm.total}
                            pageSize={searchPageForm.limit}
                        />
                    </Row>
                </Spin>
            </div>
        );
    }
}

export default connect(({ existingPage, loading }: any) => ({
    existingPage,
    listLoading: loading.effects['existingPage/getPageList'],
}))(ExistingPage);
