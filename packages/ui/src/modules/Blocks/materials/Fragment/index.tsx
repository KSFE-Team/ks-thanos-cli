import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getInitJson, getTools } from './utils';
import FragmentConfig from './config';
import PageRender from 'Src/pages/GeneratePage/materials/PageRender';
import './index.scss';

interface KFragmentProps {
    config: any,
    generatePage: {
        pageJSON: any
    }
}

class KFragment extends Component<KFragmentProps> {
    static propTypes = {
        props: PropTypes.object
    };

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
            <div
                className={'fragment-container'}
            >
                <div className='fragment-container-background'>
                    {this.renderChildren()}
                </div>
            </div>
        );
    }
}

export {
    KFragment as component,
    getInitJson,
    getTools,
    FragmentConfig as config
};
