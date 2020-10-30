import React from 'react';
import { Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import './style.scss';

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
    background: isDragging ? 'lightgreen' : '#1d1c2a',
    ...draggableStyle,
});

export default (props: any) => {
    const { data, index } = props;
    return (
        <div className="thanos-editor-block-item">
            <Draggable key={data.id} draggableId={data.id} index={index}>
                {(provided, snapshot) => (
                    <>
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                            <div className="thanos-editor-block-shortscreen">
                                <img style={{ maxWidth: '100%' }} src={data.img} />
                            </div>
                            <div className="thanos-editor-block-title">{data.componentName}</div>
                        </div>
                        {snapshot.isDragging && (
                            <div style={{transform: 'none !important'}}>
                                <div className="thanos-editor-block-shortscreen">
                                    <img style={{ maxWidth: '100%' }} src={data.img} />
                                </div>
                                <div className="thanos-editor-block-title">{data.componentName}</div>
                            </div>
                        )}
                    </>
                )}
            </Draggable>
        </div>
    );
};
