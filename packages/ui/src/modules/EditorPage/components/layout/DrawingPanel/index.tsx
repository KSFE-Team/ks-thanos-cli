import React from 'react';
import { useSelector } from 'react-redux';
import { actions } from 'kredux';
import RouteProps from 'Src/types/route';
import ComponentRender from '../../ComponentRender';

interface DrawingProps extends RouteProps {}

export default (props: DrawingProps) => {
    const page = useSelector((store: any) => store.page);
    const { components } = page.pageJson;
    return (
        <div
            className="thanos-editor-draw"
            onClick={(e) => {
                e.stopPropagation();
                actions.page.setReducers({
                    selectedId: '',
                });
            }}
        >
            {components.map((itemConfig: any) => {
                return <ComponentRender key={itemConfig.id} {...itemConfig} />;
            })}
            {!components.length && <div className="thanos-editor-empty">没得东西，赶紧整</div>}
        </div>
    );
};
