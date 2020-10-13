import React from 'react';
import { getInitJson, getTools } from './utils';
import tableConfig from './config';
import PageRender from 'Src/pages/GeneratePage/materials/PageRender';

interface KRelationTableProps {
    columns: any[],
    config: any,
    generatePage: {
        pageJSON: any
    }
}

class KRelationTable extends React.Component<KRelationTableProps> {

    renderChildren = () => {
        const { config } = this.props;
        if (config.components && config.components.length) {
            return <PageRender
                dataSource={config.components}
                generatePage={this.props.generatePage}
                parentComponent={config}
            />;
        } else {
            return null;
        }
    };

    render() {
        return (
            <div>
                {this.renderChildren()}
            </div>
        );
    }
}

export {
    KRelationTable as component,
    getInitJson,
    getTools,
    tableConfig as config
};
