import React from 'react';
import './style.scss';

export default (props: any) => {
    const { data } = props;
    return (
        <div className="thanos-editor-block-item" data-name={data.componentName}>
            {/* <div className="thanos-editor-block-shortscreen">
                <img
                    style={{ maxWidth: '100%' }}
                    src={data.img || 'https://zos.alipayobjects.com/rmsportal/ndmJrWwkQloTtKg.jpg'}
                />
            </div> */}
            <div className="thanos-editor-block-title">{data.name}</div>
        </div>
    );
};
