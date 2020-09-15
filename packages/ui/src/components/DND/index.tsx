import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

interface DnDProps {
    dataSource: any[];
    direction: "vertical" | "horizontal" | undefined;
    droppableId: string;
    interval: string|number;
    emptyNode: any;
    onRender(dataItem: any, index: number): void;
    onDragStart(): void;
    onDragEnd(dataSource: any, result: any): void;
}
export default class DnD extends React.PureComponent<DnDProps> {

    static propTypes = {
        droppableId: PropTypes.string, // 唯一拖拽id
        direction: PropTypes.oneOf(['vertical', 'horizontal']), // 拖拽方向
        interval: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // 子组件间隔
        dataSource: PropTypes.array, // 需要排序的数据源
        onRender: PropTypes.func,
        onDragStart: PropTypes.func, // 拖拽开始事件
        onDragEnd: PropTypes.func, // 拖拽结束事件
        emptyNode: PropTypes.node, // 空节点渲染
    }

    static defaultProps = {
        droppableId: 'drappable',
        direction: 'vertical',
        interval: 0,
        onDragStart: () => { },
        onDropEnd: () => { },
        emptyNode: <div
            style={{ textAlign: 'center' }}
        >
            暂无数据
        </div>
    }

    /**
     * 重新排序
     * @param {Array} list 需要重新排序的数组
     * @param {number} startIndex 旧的位置index
     * @param {number} endIndex 新的位置index
     */
    reorder = (list: any[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    /**
     * 处理开始拖拽事件
     */
    handleDragStart = () => {
        this.props.onDragStart();
    }

    /**
     * 处理结束拖拽事件
     */
    handleDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        const dataSource = this.reorder(
            this.props.dataSource,
            result.source.index,
            result.destination.index
        );

        this.props.onDragEnd(dataSource, result);
    }

    render() {
        const { dataSource, direction, droppableId, interval, onRender, emptyNode } = this.props;
        return (
            <DragDropContext
                onDragEnd={this.handleDragEnd}
                onDragStart={this.handleDragStart}
            >
                <Droppable droppableId={droppableId} direction={direction}>
                    {
                        (provided: any, snapshot: any) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`drappable-container ${snapshot.isDraggingOver ? 'draggingOver' : ''}`}
                            >
                                <React.Fragment>
                                    {
                                        dataSource.map((dataItem, index) => (
                                            <Draggable
                                                key={index}
                                                index={index}
                                                draggableId={`${droppableId}-${index}`}
                                            >
                                                {
                                                    (provided: any, snapshot: any) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`draggable-container ${snapshot.isDragging ? 'isDragging' : ''}`}
                                                            style={{
                                                                marginBottom: interval,
                                                                ...provided.draggableProps.style,
                                                            }}
                                                        >
                                                            {onRender(dataItem, index)}
                                                        </div>
                                                    )
                                                }
                                            </Draggable>
                                        ))
                                    }
                                    {
                                        !dataSource.length && emptyNode
                                    }
                                    {provided.placeholder}
                                </React.Fragment>
                            </div>
                        )
                    }
                </Droppable>
            </DragDropContext>
        );
    }
}
