import React, { useState } from 'react';
import RouteProps from 'Src/types/route';
import HeaderPanel from './components/layout/HeaderPanel';
import ContentPanel from './components/layout/ContentPanel';
import DrawingPanel from './components/layout/DrawingPanel';
import PropertyPanel from './components/layout/PropertyPanel';
import Materials from './components/materials';
import { setComponents } from './utils/constants';
import './style.scss';

export default (props: RouteProps) => {
    useState(() => {
        Object.keys(Materials).forEach((key) => {
            setComponents(key, Materials[key]);
        });
    });
    return (
        <div className="thanos-editor-container">
            <HeaderPanel />
            <div className="thanos-editor-content">
                <ContentPanel />
                <DrawingPanel {...props} />
                <PropertyPanel />
            </div>
        </div>
    );
};
