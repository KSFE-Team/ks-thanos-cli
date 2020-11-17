import React from 'react';
import ComponentRender from '../../ComponentRender';
import * as tools from './utils';
import ExtendContainerConfig from './config';
import Sortable from '../../Sortable';
import './style.scss';

interface MaterialExtendContainerProps {
    components: any;
    id: string;
    page: any;
}

const MaterialExtendContainer = (props: MaterialExtendContainerProps) => {
    const { components = [], id, page } = props;
    return (
        <div className="extendContainer-container">
            <div className="extendContainer-title">加减容器</div>
            <div className="extendContainer-container-background">
                <Sortable className="react-sortable-drop-container" list={components} id={id} redux={page}>
                    {components.map((itemProps: any, index: number) => {
                        return (
                            <div className="extendContainer-item-container" key={`${itemProps.id}`}>
                                <ComponentRender {...itemProps} index={index} />
                            </div>
                        );
                    })}
                </Sortable>
            </div>
        </div>
    );
};

export { MaterialExtendContainer as component, ExtendContainerConfig as config, tools };
