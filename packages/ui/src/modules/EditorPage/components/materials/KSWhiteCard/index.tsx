import React from 'react';
import ComponentRender from '../../ComponentRender';
import * as tools from './utils';
import KSWhiteCardConfig from './config';
import Sortable from '../../Sortable';

interface MaterialKSWhiteCardProps {
    components: any;
    id: string;
    page: any;
}

const MaterialKSWhiteCard = (props: MaterialKSWhiteCardProps) => {
    const { components = [], id, page } = props;
    return (
        <div className="form-container">
            <div className="form-title">KSWhiteCard容器</div>
            <div className="form-container-background">
                <Sortable className="react-sortable-drop-container" list={components} id={id} redux={page}>
                    {components.map((itemProps: any, index: number) => {
                        return (
                            <div className="form-item-container" key={`${itemProps.id}`}>
                                <ComponentRender {...itemProps} index={index} />
                            </div>
                        );
                    })}
                </Sortable>
            </div>
        </div>
    );
};

export { MaterialKSWhiteCard as component, KSWhiteCardConfig as config, tools };
