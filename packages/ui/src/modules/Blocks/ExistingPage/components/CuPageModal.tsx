/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from 'react';
import { connect, actions } from 'kredux';
import { Button, Modal, Form, Input, Pagination, message, Spin } from 'antd';
import { goto } from 'Src/utils';
import SearchForm from 'Src/components/SearchForm';
import { tempTabs as TEMP_TABS } from '../../constants';
import { STATE } from '../model/existingPage';
import ScreenShot from './ScreenShot';
// import './style.scss';

interface CuTemplateProps {
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
            type: {
                value: string;
            };
        };
    };
    form: any;
    listLoading: boolean;
    getPageListLoading: boolean;
}
class CuTempLateModal extends Component<CuTemplateProps> {
    state = {
        tab: 0,
        tempTabs: TEMP_TABS,
        pageOrTempInfo: {
            pageOrTemp: 'template',
            type: '2',
        },
        templateId: '',
    };

    componentDidMount() {
        // 初始化redux
        this.changeLimit(10);
        this.loadList();
    }

    changeLimit = (limit: any) => {
        actions.myTemplate.setReducers({
            searchTemplateForm: {
                ...STATE.searchTemplateForm,
                limit,
            },
        });
    };

    handlePageChange = (page: any) => {
        const { pageOrTempInfo } = this.state;
        if (pageOrTempInfo.pageOrTemp === 'page') {
            actions.existingPage.setReducers({
                searchPageForm: {
                    ...this.props.existingPage.searchPageForm,
                    page,
                },
            });
        } else {
            actions.myTemplate.setReducers({
                searchTemplateForm: {
                    ...this.props.myTemplate.searchTemplateForm,
                    page,
                },
            });
        }

        this.loadList();
    };

    loadList = () => {
        const { pageOrTempInfo } = this.state;
        if (pageOrTempInfo.pageOrTemp === 'page') {
            actions.existingPage.getPageList();
        } else {
            actions.myTemplate.getTemplateList({ ...pageOrTempInfo });
        }
    };

    resetPage = () => {
        this.handlePageChange(1);
    };

    changeTabe = (idx: number) => {
        const { pageOrTempInfo } = this.state;
        if (idx === 0) {
            // 库模版
            pageOrTempInfo.pageOrTemp = 'template';
            pageOrTempInfo.type = '2';
            this.changeLimit(10);
        } else if (idx === 1) {
            // 共享模版
            pageOrTempInfo.pageOrTemp = 'template';
            pageOrTempInfo.type = '1';
            this.changeLimit(10);
        } else if (idx === 2) {
            // 现有页面
            pageOrTempInfo.pageOrTemp = 'page';
            pageOrTempInfo.type = '';
        }
        this.setState({
            tab: idx,
            pageOrTempInfo,
            templateId: '',
        });
        this.loadList();
    };

    gotoPage = () => {
        actions.existingPage.setReducers({
            cuPageModalVisible: false,
        });
        const { pageOrTempInfo, templateId } = this.state;
        if (templateId === '-1') {
            // 新增空白页面
            goto.push(`/generatePage/${templateId}`);
        } else {
            goto.push(`/generatePage/${templateId}?pageOrTemp=${pageOrTempInfo.pageOrTemp}`);
        }
        // templateName
    };

    render() {
        const { tempTabs, tab, templateId, pageOrTempInfo } = this.state;
        const { pageOrTemp } = pageOrTempInfo;
        const { listLoading, getPageListLoading } = this.props;
        const { pageList = [], searchPageForm, cuPageModalVisible } = this.props.existingPage;
        const { templateList = [], searchTemplateForm } = this.props.myTemplate;
        const list = pageOrTemp === 'page' ? pageList : templateList;
        const searchForm = pageOrTemp === 'page' ? searchPageForm : searchTemplateForm;
        return (
            <Modal
                visible={cuPageModalVisible}
                width="85%"
                confirmLoading={listLoading}
                onCancel={() => {
                    actions.existingPage.setReducers({
                        cuPageModalVisible: false,
                    });
                    actions.myTemplate.getTemplateList({ pageOrTemp: 'page' });
                }}
                onOk={() => {
                    if (!templateId) {
                        message.error('请选择一个选项');
                    } else {
                        this.gotoPage();
                    }
                }}
            >
                <SearchForm
                    form={this.props.form}
                    components={[
                        {
                            title: pageOrTemp === 'page' ? '页面名称' : '模版名称',
                            key: pageOrTemp === 'page' ? 'pageName' : 'templateName',
                            component: <Input placeholder="请输入模版名称" onPressEnter={this.resetPage} />,
                        },
                    ]}
                    actions={
                        <>
                            <Button onClick={this.resetPage}>查询</Button>
                            {tempTabs.map((item: any, idx: any) => {
                                return (
                                    <Button
                                        key={item.index}
                                        type="primary"
                                        className={tab === idx ? 'active mar-l-4' : 'mar-l-4'}
                                        onClick={() => {
                                            this.changeTabe(idx);
                                        }}
                                    >
                                        {item.name}
                                    </Button>
                                );
                            })}
                        </>
                    }
                />
                <Spin spinning={!!listLoading || !!getPageListLoading}>
                    <ul className="content">
                        {tab === 0 && (
                            <li
                                key={-1}
                                className={
                                    templateId === '-1'
                                        ? 'liborder temp-item-container temp-item-text'
                                        : 'temp-item-container temp-item-text'
                                }
                                onClick={() => this.setState({ templateId: '-1' })}
                            >
                                空白模版
                            </li>
                        )}
                        {list.length && list.length > 0 ? (
                            list.map((item: any, ind: any) => {
                                const { img = '' } = item;
                                if (img) {
                                    return (
                                        <ScreenShot
                                            key={ind}
                                            text={item[`${pageOrTemp}Name`]}
                                            src={img}
                                            className={templateId === item[`${pageOrTemp}Name`] ? 'liborder' : ''}
                                            onClick={() => {
                                                this.setState({
                                                    templateId: item[`${pageOrTemp}Name`],
                                                });
                                            }}
                                        />
                                    );
                                }
                                return (
                                    <li
                                        key={ind}
                                        className={
                                            templateId === item[`${pageOrTemp}Name`]
                                                ? 'liborder temp-item-container temp-item-text'
                                                : 'temp-item-container temp-item-text'
                                        }
                                        onClick={() => this.setState({ templateId: item[`${pageOrTemp}Name`] })}
                                    >
                                        {item[`${pageOrTemp}Name`]}
                                    </li>
                                );
                            })
                        ) : (
                            <li key={-2}>暂无数据</li>
                        )}
                    </ul>
                    <Pagination
                        defaultCurrent={1}
                        total={searchForm.total}
                        current={searchForm.page}
                        pageSize={searchForm.limit}
                        onChange={this.handlePageChange}
                    />
                </Spin>
            </Modal>
        );
    }
}

export default connect(({ myTemplate, existingPage, loading }: any) => ({
    myTemplate,
    existingPage,
    listLoading: loading.effects['myTemplate/getTemplateList'],
    getPageListLoading: loading.effects['existingPage/getPageList'],
}))(
    Form.create({
        mapPropsToFields(props: CuTemplateProps) {
            return {
                pageName: Form.createFormField({
                    ...props.existingPage.searchPageForm.pageName,
                    value: props.existingPage.searchPageForm.pageName.value,
                }),
                templateName: Form.createFormField({
                    ...props.myTemplate.searchTemplateForm.templateName,
                    value: props.myTemplate.searchTemplateForm.templateName.value,
                }),
            };
        },
        onFieldsChange(props: CuTemplateProps, fields) {
            actions.existingPage.setReducers({
                searchPageForm: {
                    ...props.existingPage.searchPageForm,
                    ...fields,
                },
            });
            actions.myTemplate.setReducers({
                searchTemplateForm: {
                    ...props.myTemplate.searchTemplateForm,
                    ...fields,
                },
            });
        },
    })(CuTempLateModal),
);
