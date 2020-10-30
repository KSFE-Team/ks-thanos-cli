import React from 'react';
import { actions } from 'kredux';
import { useSelector } from 'react-redux';
import { getComponents } from 'Src/modules/EditorPage/utils/constants';
import './style.scss';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { deleteComponent } from '../../utils/index';

export default (props: any) => {
    const componentMap = getComponents();
    const ComponentByName = componentMap[props.componentName].component;

    const page = useSelector((store: any) => store.page);
    return (
        <Draggable
            key={props.index}
            draggableId={props.id}
            index={props.index}
        >
            {(provided, _snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="component-container"
                    onClick={(e) => {
                        e.stopPropagation();
                        actions.page.setReducers({
                            selectedId: `${props.id}_${props.componentName}`,
                        });
                    }}
                >
                    <Droppable droppableId={`componentItem${props.id}`}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                <ComponentByName {...props} />
                                <span className="close_item" onClick={() => { deleteComponent(props.id, page.pageJson.components) }}>X</span>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};
