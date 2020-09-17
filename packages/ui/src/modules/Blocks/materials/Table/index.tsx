import React from 'react';
import { Table } from 'antd';
import { getInitJson, getTools } from './utils';
import tableConfig from './config';

interface KTableProps {
    columns: any[],
}

class KTable extends React.Component<KTableProps> {

    render() {
        const { columns, ...OTHER_PROPS } = this.props;
        let showColumns = [...columns];
        showColumns = showColumns.filter(({ component }) => !component);
        return (
            <Table
                {...OTHER_PROPS}
                columns={showColumns}
            />
        );
    }
}

export {
    KTable as component,
    getInitJson,
    getTools,
    tableConfig as config
};
