import React from 'react';
import ContentItem from '../ContentItem';
import './style.scss';

const componentList = [
    {
        componentName: '输入框',
        componentCode: 'Input',
        img: 'https://zos.alipayobjects.com/rmsportal/ndmJrWwkQloTtKg.jpg',
    },
    {
        componentName: '表单',
        componentCode: 'Form',
        img: 'https://zos.alipayobjects.com/rmsportal/ndmJrWwkQloTtKg.jpg',
    },
];

export default () => {
    return (
        <>
            <div className="thanos-editor-blocks-group-title">groupTitle</div>
            <div className="thanos-editor-blocks-group-content">
                {componentList.map((item, index) => {
                    return <ContentItem data={item} key={index} />;
                })}
            </div>
        </>
    );
};
