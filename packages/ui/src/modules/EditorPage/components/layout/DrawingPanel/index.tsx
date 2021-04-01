import React from 'react';
import { useSelector } from 'react-redux';
import { actions } from 'kredux';
import RouteProps from 'Src/types/route';
import ComponentRender from '../../ComponentRender';
import Sortable from '../../Sortable';

interface DrawingProps extends RouteProps {}

export default (props: DrawingProps) => {
    const page = useSelector((store: any) => store.page);
    const { components } = page.pageJson;
    return (
        <div
            className="thanos-editor-draw"
            onClick={(e) => {
                e.stopPropagation();
                if (page.selectedId !== '') {
                    actions.page.setReducers({
                        selectedId: '',
                    });
                }
            }}
        >
            <Sortable list={components} redux={page} className="react-sortable-drop-container" id="draw">
                {components.map((itemConfig: any, index: any) => {
                    return (
                        <div key={`${itemConfig.id}`}>
                            <ComponentRender key={itemConfig.id} {...itemConfig} />
                        </div>
                    );
                })}
            </Sortable>
            {!components.length && <div className="thanos-editor-empty">没得东西，赶紧整</div>}
        </div>
    );
};
