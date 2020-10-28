import React, { ReactNode } from 'react';
import { Row, Col } from 'antd';
import './style.scss';

interface ConfigTableColumn {
    title?: string;
    dataIndex?: string;
    col?: number;
    render?(text: any, record: any, index: number): ReactNode;
}

interface TableData {
    [key: string]: any;
}

interface ConfigTable {
    columns: ConfigTableColumn[];
    dataSource: TableData[];
}

const DEFAULT_COL = 5;

export default (props: ConfigTable) => {
    const { columns, dataSource } = props;
    return (
        <div className="config-table">
            <div className="config-table-header">
                <Row>
                    {columns.map(({ title, col = DEFAULT_COL }: ConfigTableColumn, index: number) => {
                        return (
                            <Col className="config-table-cell" span={col} key={`${title}_${index}`}>
                                {title}
                            </Col>
                        );
                    })}
                </Row>
            </div>
            <div className="config-table-content">
                {dataSource.map((data: TableData, index: number) => {
                    return (
                        <Row className="config-table-data-row" key={index}>
                            {columns.map(
                                ({ dataIndex, title, render, col = DEFAULT_COL }: ConfigTableColumn, idx: number) => {
                                    const text: any = dataIndex ? data[dataIndex] : undefined;
                                    const content: ReactNode | string = render ? render(text, data, index) : text;
                                    return (
                                        <Col className="config-table-cell" span={col} key={`${title}_${index}_${idx}`}>
                                            {content}
                                        </Col>
                                    );
                                },
                            )}
                        </Row>
                    );
                })}
            </div>
        </div>
    );
};
