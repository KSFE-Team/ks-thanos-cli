import React, { useState, useEffect } from 'react';
import RouteProps from 'Src/types/route';
import { actions } from 'kredux';
import qs from 'qs';
import HeaderPanel from './components/layout/HeaderPanel';
import ContentPanel from './components/layout/ContentPanel';
import DrawingPanel from './components/layout/DrawingPanel';
import PropertyPanel from './components/layout/PropertyPanel';
import Materials from './components/materials';
import { setComponents } from './utils/constants';
import { STATE } from './model';
import './style.scss';

export default (props: RouteProps) => {
    useState(() => {
        Object.keys(Materials).forEach((key) => {
            setComponents(key, Materials[key]);
        });
    });

    useEffect(() => {
        const pageName = window.location.pathname.split('/')[2];
        if (pageName !== '-1') {
            const str = window.location.search.split('?')[1];
            const obj = qs.parse(str);
            actions.page.getTemplateItem({
                pageName,
                pageOrTemp: obj.pageOrTemp,
            });
        } else {
            actions.page.setReducers({
                pageJson: STATE.pageJson,
            });
        }
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
