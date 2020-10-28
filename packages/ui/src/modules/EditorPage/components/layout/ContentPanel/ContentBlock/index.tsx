import React from 'react';
import ContentItem from '../ContentItem';
import './style.scss';

export default (props: any) => {
    const { data } = props;
    const { groupTitle, components } = data;
    return (
        <>
            <div className="thanos-editor-blocks-group-title">{groupTitle}</div>
            <div className="thanos-editor-blocks-group-content">
                {components.map((item: any, index: any) => {
                    return <ContentItem data={item} key={index} index={index} />;
                })}
            </div>
        </>
    );
};
