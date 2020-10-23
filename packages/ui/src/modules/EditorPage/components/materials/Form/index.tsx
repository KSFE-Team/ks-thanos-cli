import React, { Component } from 'react';
import ComponentRender from '../../ComponentRender';
import { getInitJson, getTools } from './utils';
import FormConfig from './config';
import './index.scss';

interface KFormProps {
    config: any;
    generatePage: {
        pageJSON: any;
        pageName: string;
    };
}

class KForm extends Component<KFormProps> {
    renderChildren = (props: any) => {
        const { components = [] } = this.props;
        return components.map((itemProps: any) => {
            return <ComponentRender {...itemProps} />;
        });
    };

    render() {
        // const {
        //     // generatePage: { pageName = '' },
        // } = this.props;
        return (
            <div className="form-container">
                <div className="form-title">表单</div>
                <div className="form-container-background">{this.renderChildren(this.props)}</div>
            </div>
        );
    }
}

export { KForm as component, getInitJson, getTools, FormConfig as config };
