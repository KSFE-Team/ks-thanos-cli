import React from 'react';
import { useSelector } from 'react-redux';
import RouteProps from 'Src/types/route';
import ComponentRender from '../../ComponentRender';

interface DrawingProps extends RouteProps {}

export default (props: DrawingProps) => {
    const page = useSelector((store: any) => store.page);
    const { components } = page.pageJson;
    return (
        <div className="thanos-editor-draw">
            {components.map((itemConfig: any) => {
                return <ComponentRender key={itemConfig.id} {...itemConfig} />;
            })}
        </div>
    );
};
