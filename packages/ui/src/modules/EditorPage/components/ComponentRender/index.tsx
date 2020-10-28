import React from 'react';
import { actions } from 'kredux';
import { getComponents } from 'Src/modules/EditorPage/utils/constants';
import './style.scss';

export default (props: any) => {
    const componentMap = getComponents();
    const ComponentByName = componentMap[props.componentName].component;
    return (
        <div
            className="component-container"
            onClick={(e) => {
                e.stopPropagation();
                actions.page.setReducers({
                    selectedId: `${props.id}_${props.componentName}`,
                });
            }}
        >
            <ComponentByName {...props} />
        </div>
    );
};
