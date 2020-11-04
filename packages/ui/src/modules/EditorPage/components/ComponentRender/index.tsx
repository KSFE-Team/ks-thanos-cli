/* eslint-disable no-shadow */
import React from 'react';
import { Modal } from 'antd';
import { actions } from 'kredux';
import { useSelector } from 'react-redux';
import { getComponents } from 'Src/modules/EditorPage/utils/constants';
import './style.scss';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { deleteComponent, setTree } from '../../utils/index';

const Confirm = Modal.confirm;

export default (props: any) => {
    const componentMap = getComponents();
    const ComponentByName = componentMap[props.componentName].component;
    const page = useSelector((store: any) => store.page);
    const droppableId = props.componentName === 'Form' ? '1' : props.id;
    return (
        <Draggable key={props.index} draggableId={props.id} index={props.index}>
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
                    <Droppable droppableId={droppableId}>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                <ComponentByName {...props} />
                                <span
                                    className="close_item"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        Confirm({
                                            title: '请确认删除组件',
                                            content: '删除后其配置会消失，请谨慎操作',
                                            onOk: () => {
                                                setTree(
                                                    { components: deleteComponent(props.id, page.pageJson.components) },
                                                    page.pageJson,
                                                );
                                            },
                                        });
                                    }}
                                >
                                    X
                                </span>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};
