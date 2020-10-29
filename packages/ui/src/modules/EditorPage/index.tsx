import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { actions } from 'kredux';
import RouteProps from 'Src/types/route';
import HeaderPanel from './components/layout/HeaderPanel';
import ContentPanel from './components/layout/ContentPanel';
import DrawingPanel from './components/layout/DrawingPanel';
import PropertyPanel from './components/layout/PropertyPanel';
import Materials from './components/materials';
import { setComponents } from './utils/constants';
import { handlePageJson } from './utils/index';
import { componentList } from './components/layout/ContentPanel';
import './style.scss';

export default (props: RouteProps) => {
    useState(() => {
        Object.keys(Materials).forEach((key) => {
            setComponents(key, Materials[key]);
        });
    });
    const page = useSelector((store: any) => store.page);

    // 拖拽结束
    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        console.log('拖拽结束====>', result)
        const { source, destination, draggableId } = result;
        handlePageJson(componentList, page.pageJson, draggableId, source, destination);
    };

    return (
        <div className="thanos-editor-container">
            <HeaderPanel />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="thanos-editor-content">
                    <ContentPanel />
                    <DrawingPanel {...props} />
                    <PropertyPanel />
                </div>
            </DragDropContext>
        </div>
    );
};
