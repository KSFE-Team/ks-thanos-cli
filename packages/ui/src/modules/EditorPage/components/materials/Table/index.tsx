import React from 'react';
import { Table } from 'antd';
import { ComponentConfig } from 'Src/types/componentConfig';
import * as tools from './utils';
import TableConfig from './config';

interface MaterialTableProps extends ComponentConfig {}

const MaterialTable = (props: MaterialTableProps) => {
    const { id } = props;
    const config = props[id] || {};
    const { columns } = config;
    return <Table columns={columns} dataSource={[]} />;
};

export { MaterialTable as component, TableConfig as config, tools };
