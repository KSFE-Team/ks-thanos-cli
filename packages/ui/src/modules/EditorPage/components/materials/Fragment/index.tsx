import React from 'react';
import ComponentRender from '../../ComponentRender';
import * as tools from './utils';
import FragmentConfig from './config';
import Sortable from '../../Sortable';

interface MaterialFragmentProps {
    components: any;
    id: string;
    page: any;
}

const MaterialFragment = (props: MaterialFragmentProps) => {
    const { components = [], id, page } = props;
    return (
        <div className="form-container">
            <div className="form-title">Fragment容器</div>
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

export { MaterialFragment as component, FragmentConfig as config, tools };
