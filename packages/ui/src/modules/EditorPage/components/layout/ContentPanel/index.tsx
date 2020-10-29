import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import BlockGroup from './ContentBlock';
import './style.scss';

export const componentList = [
    {
        groupTitle: '基础组件',
        components: [
            {
                id: 'wl1cuuzftp',
                componentName: 'Form',
                source: 'antd',
                default: false,
                props: {},
                img: 'https://zos.alipayobjects.com/rmsportal/ndmJrWwkQloTtKg.jpg',
            },
            {
                id: 'kqzwrhm1nrp',
                componentName: 'Input',
                source: 'antd',
                default: false,
                props: {},
                img: 'https://zos.alipayobjects.com/rmsportal/ndmJrWwkQloTtKg.jpg',
            },
            {
                id: 'kqzwrhm1nr323p',
                componentName: 'Checkbox',
                source: 'antd',
                default: false,
                props: {},
                img: 'https://zos.alipayobjects.com/rmsportal/ndmJrWwkQloTtKg.jpg',
            },
            {
                id: 'kqzwrhm1nr323p(1)',
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
