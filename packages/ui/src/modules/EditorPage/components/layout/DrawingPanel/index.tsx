import React from 'react';
import { useSelector } from 'react-redux';
import { actions } from 'kredux';
import RouteProps from 'Src/types/route';
import ComponentRender from '../../ComponentRender';
import { Droppable } from 'react-beautiful-dnd';

interface DrawingProps extends RouteProps { }

export default (props: DrawingProps) => {
    const page = useSelector((store: any) => store.page);
    const { components } = page.pageJson;
    console.log('页面组件数据===>', components);
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
            <Droppable droppableId='draw'>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} style={{height:'100%'}}>
                        {components.map((itemConfig: any,index:any) => {
                            return <ComponentRender key={itemConfig.id} {...itemConfig} index={index}/>;
                        })}
                        {!components.length && <div className="thanos-editor-empty">没得东西，赶紧整</div>}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};
