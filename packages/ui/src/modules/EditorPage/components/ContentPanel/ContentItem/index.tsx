import React from 'react';
import './style.scss';

export default (props: any) => {
    const { data } = props;
    return (
        <div className="thanos-editor-block-item">
            <div className="thanos-editor-block-shortscreen">
                <img style={{ maxWidth: '100%' }} src={data.img} />
            </div>
            <div className="thanos-editor-block-title">{data.componentName}</div>
        </div>
    );
};
