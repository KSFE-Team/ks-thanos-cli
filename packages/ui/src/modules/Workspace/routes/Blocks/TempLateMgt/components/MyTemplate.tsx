/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from 'react';
import { connect, actions } from 'kredux';
import { Row, Button, Col, Input, Pagination, Spin, Empty } from 'antd';
import { STATE } from '../model/index';
import BlockItem from '../../component/BlockItem';
import styles from '../../component/index.module.scss';

const { Search } = Input;

interface MyTemplateProps {
    myTemplate: {
        templateList: any[];
        searchTemplateForm: {
            limit: number;
            page: number;
            total: number;
            totalPage: number;
            templateName: {
                value: string;
            };
        };
    };
    form: any;
    listLoading: boolean;
}

class MyTemplate extends Component<MyTemplateProps> {
    componentDidMount() {
        // 初始化redux
        const initialState = { ...STATE };
        actions.myTemplate.setReducers({
            ...initialState,
        });
        this.loadList();
    }

    handlePageChange = (page: any) => {
        actions.myTemplate.setReducers({
            searchPageForm: {
                ...this.props.myTemplate.searchTemplateForm,
                page,
            },
        });
        this.loadList();
    };

    loadList = () => {
        actions.myTemplate.getTemplateList();
    };

    resetPage = (val: any) => {
        this.props.myTemplate.searchTemplateForm.templateName.value = val;
        this.handlePageChange(1);
    };

    render() {
        const { listLoading } = this.props;
        const { templateList = [], searchTemplateForm } = this.props.myTemplate;
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
                    {templateList.map((item, index) => {
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
                                placeholder="请输入模版名称"
                                style={{ width: 200, marginRight: 10 }}
                                onSearch={this.resetPage}
                            />
                            <Button>刷新</Button>
                        </Col>
                    </Row>
                    {contents}
                    <Row className={styles.pagination} type="flex" justify="end">
                        <Pagination
                            size={'small'}
                            current={searchTemplateForm.page}
                            onChange={this.handlePageChange}
                            total={searchTemplateForm.total}
                            pageSize={searchTemplateForm.limit}
                        />
                    </Row>
                    {templateList.length === 0 && !listLoading ? <Empty description={<span>未搜索到任何数据</span>}></Empty> : ''}
                    }
                </Spin>
            </div>
        );
    }
}

export default connect(({ myTemplate, loading }: any) => ({
    myTemplate,
    listLoading: loading.effects['myTemplate/getTemplateList'],
}))(MyTemplate);
