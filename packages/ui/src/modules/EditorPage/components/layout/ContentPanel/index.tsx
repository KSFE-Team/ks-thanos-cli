import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import BlockGroup from './ContentBlock';
import './style.scss';

export const componentList = [
    {
        groupTitle: '基础组件',
        components: [
            {
                id: uuid(),
                componentName: 'Form',
                source: 'antd',
                default: false,
                props: {},
                components: [],
                img: 'https://zos.alipayobjects.com/rmsportal/ndmJrWwkQloTtKg.jpg',
            },
            {
                id: uuid(),
                componentName: 'Input',
                source: 'antd',
                default: false,
                props: {},
                img: 'https://zos.alipayobjects.com/rmsportal/ndmJrWwkQloTtKg.jpg',
            },
            {
                id: uuid(),
                componentName: 'Checkbox',
                source: 'antd',
                default: false,
                props: {},
                img: 'https://zos.alipayobjects.com/rmsportal/ndmJrWwkQloTtKg.jpg',
            },
            {
                id: uuid(),
                componentName: 'Checkbox(充数的)',
                source: 'antd',
                default: false,
                props: {},
                img: 'https://zos.alipayobjects.com/rmsportal/ndmJrWwkQloTtKg.jpg',
            },
        ],
    },
];

export default () => {
    return (
        <Droppable droppableId="ITEMS" isDropDisabled>
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
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};
