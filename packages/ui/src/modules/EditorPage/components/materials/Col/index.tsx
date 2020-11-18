import React from 'react';
import ComponentRender from '../../ComponentRender';
import * as tools from './utils';
import ColConfig from './config';
import Sortable from '../../Sortable';
import './style.scss';

interface MaterialColProps {
    components: any;
    id: string;
    page: any;
}

const MaterialCol = (props: MaterialColProps) => {
    const { components = [], id, page } = props;
    return (
        <div className="row-container">
            <div className="row-title">Col</div>
            <div className="row-container-background">
                <Sortable className="react-sortable-drop-container" list={components} id={id} redux={page}>
                    {components.map((itemProps: any, index: number) => {
                        return (
                            <div className="row-item-container" key={`${itemProps.id}`}>
                                <ComponentRender {...itemProps} index={index} />
                            </div>
                        );
                    })}
                </Sortable>
            </div>
        </div>
    );
};

export { MaterialCol as component, ColConfig as config, tools };
