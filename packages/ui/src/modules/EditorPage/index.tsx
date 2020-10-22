import React from 'react';
import HeaderPanel from './components/HeaderPanel';
import ContentPanel from './components/ContentPanel';
import DrawingPanel from './components/DrawingPanel';
import PropertyPanel from './components/PropertyPanel';
import './style.scss';

export default () => {
    return (
        <div className="thanos-editor-container">
            <HeaderPanel />
            <div className="thanos-editor-content">
                <ContentPanel />
                <DrawingPanel />
                <PropertyPanel />
            </div>
        </div>
    );
};
