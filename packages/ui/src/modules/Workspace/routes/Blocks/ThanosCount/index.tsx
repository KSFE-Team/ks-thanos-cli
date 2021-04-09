import React, { useEffect } from 'react';
import { actions } from 'kredux';
import { useSelector } from 'react-redux';
import { Button, Table, Tag } from 'antd';
import { getGitParam } from 'Src/utils/effectiveRate';
import '../Dashboard/style.scss';

export default () => {
    const { thanoslog } = useSelector((store: any) => ({
        thanoslog: store.thanoslog,
    }));

    const { list = [], searchForm } = thanoslog;
    useEffect(() => {
        actions.thanoslog.getLogList();
    }, []);
    const columns = [
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            // eslint-disable-next-line consistent-return
            render: (status: any) => {
                switch (status) {
                    case 0:
                        return <Tag color="blue">未计算</Tag>;
                    case 1:
                        return <Tag color="green">已计算</Tag>;
                    default:
                        break;
                }
            },
        },
        {
            title: '项目名称',
            dataIndex: 'projectName',
            key: 'projectName',
        },
        {
            title: '模块名称',
            dataIndex: 'pageName',
            key: 'pageName',
            render: (val: string, record: { pageChineseName: string }) => (
                <div>
                    <span>{val}</span>
                    <span>{record.pageChineseName ? record.pageChineseName : ''}</span>
                </div>
            ),
        },
        {
            title: '模版名称',
            dataIndex: 'templateName',
            key: 'templateName',
        },
        {
            title: '初始行数',
            dataIndex: 'codeInitCount',
            key: 'codeInitCount',
        },
        {
            title: '删除行数',
            dataIndex: 'codeDeleteCount',
            key: 'codeDeleteCount',
        },
        {
            title: '上线行数',
            dataIndex: 'codeOnlineCount',
            key: 'codeOnlineCount',
        },
        {
            title: '有效使用率%',
            dataIndex: 'effectiveRate',
            key: 'effectiveRate',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (val: any, record: any) => {
                return (
                    <Button
                        disabled={record.status}
                        onClick={() => {
                            handleEffectiveRate(record);
                        }}
                    >
                        计算
                    </Button>
                );
            },
        },
    ];

    const handlePageChange = async (page: any) => {
        actions.thanoslog.setReducers({
            searchForm: {
                ...searchForm,
                page,
            },
        });
        actions.thanoslog.getLogList();
    };

    const handleEffectiveRate = async (record: any) => {
        const data = await getGitParam(record);
        const { codeInitCount, initCommitId, onLineCommitId } = data;
        const params = {
            newCommitId: onLineCommitId,
            oldCommitId: initCommitId,
            pagePath: record.pagePath,
            projectName: record.projectName,
            codeInitCount,
            record,
        };
        actions.thanoslog.gitDiff(params);
    };

    return (
        <div className="thanos-blocks-dashboard">
            <Table
                columns={columns}
                dataSource={list}
                key="_id"
                pagination={{
                    current: searchForm.page,
                    pageSize: searchForm.limit,
                    total: searchForm.total,
                    onChange: handlePageChange,
                }}
            />
        </div>
    );
};
