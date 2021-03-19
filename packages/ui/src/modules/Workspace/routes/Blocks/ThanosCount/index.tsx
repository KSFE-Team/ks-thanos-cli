import React, { useEffect } from 'react';
import { actions } from 'kredux';
import { useSelector } from 'react-redux';
import { Button, Table, Tag } from 'antd';
import { getEffectiveRate } from 'Src/utils/effectiveRate';
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
            dataIndex: 'templateName',
            key: 'templateName',
            render: (val: string, record: { pageChineseName: string }) => (
                <div>
                    <span>{val}</span>
                    <p>{record.pageChineseName ? record.pageChineseName : ''}</p>
                </div>
            ),
        },
        {
            title: '页面名称',
            dataIndex: 'pageName',
            key: 'pageName',
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
            title: '有效使用率',
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
        const params = await getEffectiveRate(record);
        console.log(params);
        const postData = {
            // eslint-disable-next-line no-underscore-dangle
            id: record._id,
            postData: params,
        };
        // actions.thanoslog.updateLog(postData);
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
