/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect } from 'react';
import { actions } from 'kredux';
import { useSelector } from 'react-redux';
import { Row, Button, Col, Input, Pagination, Spin, Empty } from 'antd';
import ThanosModal from 'Src/modules/Workspace/component/ThanosModal';
import { STATE } from '../model/index';
import BlockItem, { BlockItemData } from '../../component/BlockItem';
import CuPageModal from './CuPageModal';
import styles from '../../component/index.module.scss';

const { Search } = Input;

// interface ExistingPageProps {
//     existingPage: {
//         pageList: any[];
//         searchPageForm: {
//             limit: number;
//             page: number;
//             total: number;
//             totalPage: number;
//             pageName: {
//                 value: string;
//             };
//         };
//         cuPageModalVisible: boolean;
//     };
//     form: any;
//     listLoading: boolean;
// }

export default () => {
    const { existingPage, listLoading, workspace } = useSelector((store: any) => ({
        existingPage: store.existingPage,
        workspace: store.workspace,
        listLoading: store.loading.effects['existingPage/getPageList'],
    }));
    const { pageList = [], searchPageForm, cuPageModalVisible } = existingPage;
    const { thanosModalVisible, currentProject } = workspace;
    const handlePageChange = async (page: any) => {
        actions.existingPage.setReducers({
            searchPageForm: {
                ...searchPageForm,
                page,
            },
        });
        await loadList();
    };

    const loadList = () => {
        return actions.existingPage.getPageList();
    };

    const resetPage = async (val: any) => {
        await actions.existingPage.setReducers({
            searchPageForm: {
                ...searchPageForm,
                page: 1,
                pageName: {
                    value: val,
                },
            },
        });
        await loadList();
    };

    const reload = () => {
        handlePageChange(1);
    };

    useEffect(() => {
        const initialState = { ...STATE };
        actions.existingPage.setReducers({
            ...initialState,
        });
        loadList();
    }, []);

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
                {pageList.map((item: BlockItemData, index: number) => {
                    return (
                        <BlockItem
                            onAddProject={() => {
                                actions.global.setReducers({
                                    currentPath: `${currentProject.path}/src/pages`,
                                });
                            }}
                            key={index}
                            item={item}
                            type="page"
                        />
                    );
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
                            onSearch={resetPage}
                        />
                        <Button onClick={reload}>刷新</Button>
                        <Button
                            className="mar-l-4"
                            type="primary"
                            onClick={() => {
                                actions.existingPage.setReducers({
                                    cuPageModalVisible: true,
                                });
                            }}
                        >
                            新增
                        </Button>
                    </Col>
                </Row>
                {contents}
                <Row className={styles.pagination} justify="end">
                    <Pagination
                        size="small"
                        current={searchPageForm.page}
                        onChange={handlePageChange}
                        total={searchPageForm.total}
                        pageSize={searchPageForm.limit}
                    />
                </Row>
                {pageList.length === 0 && !listLoading ? <Empty description={<span>未搜索到任何数据</span>} /> : ''}
                {cuPageModalVisible && <CuPageModal />}
                {thanosModalVisible && <ThanosModal />}
            </Spin>
        </div>
    );
};
