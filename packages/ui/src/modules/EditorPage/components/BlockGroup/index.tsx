import React from 'react';
import BlockItem from '../BlockItem';
import './style.scss';

export default () => {
    return (
        <>
            <div className="thanos-editor-blocks-group-title">groupTitle</div>
            <div className="thanos-editor-blocks-group-content">
                <BlockItem />
                <BlockItem />
                <BlockItem />
                <BlockItem />
            </div>
        </>
    );
};
