import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import BlockGroup from './ContentBlock';
import './style.scss';

export const componentList = [
    {
        groupTitle: '基础组件',
        components: [
            {
                id: '1',
                componentName: '输入框',
                componentCode: 'Input',
                img: 'https://zos.alipayobjects.com/rmsportal/ndmJrWwkQloTtKg.jpg',
            },
            {
                id: '2',
                componentName: '表单',
                componentCode: 'Form',
                img: 'https://zos.alipayobjects.com/rmsportal/ndmJrWwkQloTtKg.jpg',
            },
        ],
    },
];

export default () => {
    return (
        <Droppable droppableId="droppableid" isDropDisabled>
            {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    <div className="thanos-editor-bar-drawar">
                        <div className="thanos-editor-bar-drawar-drop-container">
                            <div className="thanos-editor-blocks">
                                {componentList.map((item, index) => {
                                    return <BlockGroup data={item} key={index} />;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Droppable>
    );
};
