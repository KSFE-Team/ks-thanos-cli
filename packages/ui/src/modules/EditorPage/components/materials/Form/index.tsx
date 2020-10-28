import React from 'react';
import ComponentRender from '../../ComponentRender';
import * as tools from './utils';
import FormConfig from './config';
import './index.scss';

interface MaterialFormProps {
    config: any;
    components: any;
}

const MaterialForm = (props: MaterialFormProps) => {
    const { components = [] } = props;
    return (
        <div className="form-container">
            <div className="form-title">表单容器</div>
            <div className="form-container-background">
                {components.map((itemProps: any) => {
                    return (
                        <div className="form-item-container" key={itemProps.id}>
                            <ComponentRender {...itemProps} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export { MaterialForm as component, FormConfig as config, tools };
