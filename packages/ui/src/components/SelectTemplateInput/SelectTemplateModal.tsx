import React, { useEffect, useState } from 'react';
import { Modal, Spin, Row, Col, Input, Button, Pagination, Empty, message } from 'antd';
import { actions } from 'kredux';
import { useSelector } from 'react-redux';
import BlockItem, { BlockItemData } from 'Src/modules/Workspace/routes/Blocks/component/BlockItem';
import './style.scss';

const { Search } = Input;

interface SelectTemplateModalProps {
    onSubmit?(value: string): void;
}

export default (props: SelectTemplateModalProps) => {
    const { onSubmit } = props;
    const { global, loading } = useSelector((store: any) => ({
        global: store.global,
        loading: store.loading.effects['global/loadTemplateList'],
    }));
    const [state, setState] = useState(() => {
        const initState: {
            selected?: BlockItemData;
        } = {
            selected: undefined,
        };
        return initState;
    });
    const { selectTemplateModalVisible, templateList, searchTemplateForm } = global;

    useEffect(() => {
        actions.global.loadTemplateList();
    }, []);
    const contents = (
        <div
            className="select-template-container"
            style={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                padding: 24,
            }}
        >
            <Row gutter={[20, 20]}>
                {templateList.map((item: BlockItemData, index: number) => {
                    let style = {};
                    if (state.selected && state.selected.id === item.id) {
                        style = {
                            border: '1px solid #1890ff',
                        };
                    }
                    return (
                        <BlockItem
                            onClick={() => {
                                setState({
                                    selected: item,
                                });
                            }}
                            style={style}
                            key={index}
                            item={item}
                            type="page"
                            editorAble={false}
                            deleteAble={false}
                            addProjectAble={false}
                        />
                    );
                })}
            </Row>
        </div>
    );

    return (
        <Modal
            title="选择模版"
            onOk={() => {
                if (!state.selected) {
                    message.warn('请选择模版');
                    return;
                }
                if (onSubmit && state.selected.pageName) {
                    onSubmit(state.selected.pageName);
                    actions.global.setReducers({
                        selectTemplateModalVisible: false,
                    });
                }
            }}
            onCancel={() => {
                actions.global.setReducers({
                    selectTemplateModalVisible: false,
                });
            }}
            visible={selectTemplateModalVisible}
            width="80%"
        >
            <div>
                <Spin spinning={loading}>
                    <Row>
                        <Col span={8} style={{ lineHeight: '32px' }} />
                        <Col span={16} style={{ textAlign: 'right' }}>
                            <Search
                                placeholder="请输入页面名称"
                                style={{ width: 200, marginRight: 10 }}
                                onSearch={(value) => {
                                    actions.global.setReducers({
                                        searchTemplateForm: {
                                            ...searchTemplateForm,
                                            page: 1,
                                            pageName: {
                                                value,
                                            },
                                        },
                                    });
                                    actions.global.loadTemplateList();
                                }}
                            />
                            <Button
                                onClick={() => {
                                    actions.global.loadTemplateList();
                                }}
                            >
                                查询
                            </Button>
                        </Col>
                    </Row>
                    {contents}
                    <Row justify="end">
                        <Pagination
                            size="small"
                            current={searchTemplateForm.page}
                            onChange={(page) => {
                                actions.global.setReducers({
                                    searchTemplateForm: {
                                        ...searchTemplateForm,
                                        page,
                                    },
                                });
                                actions.global.loadTemplateList();
                            }}
                            total={searchTemplateForm.total}
                            pageSize={searchTemplateForm.limit}
                        />
                    </Row>
                    {templateList.length === 0 && !loading ? <Empty description={<span>未搜索到任何数据</span>} /> : ''}
                </Spin>
            </div>
        </Modal>
    );
};
