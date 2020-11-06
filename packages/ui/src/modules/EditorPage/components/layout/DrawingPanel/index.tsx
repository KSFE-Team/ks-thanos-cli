import React from 'react';
import { useSelector } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import { actions } from 'kredux';
import RouteProps from 'Src/types/route';
import ComponentRender from '../../ComponentRender';
import { handlePageJson } from '../../../utils';
import { ACTION } from '../../../utils/constants';

interface DrawingProps extends RouteProps {}

export default (props: DrawingProps) => {
    const page = useSelector((store: any) => store.page);
    const { components } = page.pageJson;
    console.log('页面组件数据===>', components);

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
            <ReactSortable
                className="react-sortable-drop-container"
                id="draw"
                list={components}
                setList={() => {}}
                group={{
                    name: 'materials',
                    pull: 'clone',
                }}
                animation={150}
                onAdd={(eva) => {
                    const { clone, newIndex, path } = eva;
                    const [parent] = path;
                    handlePageJson({
                        type: ACTION.ADD,
                        componentName: clone.dataset.name,
                        index: newIndex,
                        parentId: parent.id,
                        pageJson: page.pageJson,
                    });
                }}
                onUpdate={(eva) => {
                    console.log('page update eva', eva);
                }}
            >
                {components.map((itemConfig: any, index: any) => {
                    return <ComponentRender key={itemConfig.id} {...itemConfig} />;
                })}
            </ReactSortable>
            {!components.length && <div className="thanos-editor-empty">没得东西，赶紧整</div>}
        </div>
    );
};
