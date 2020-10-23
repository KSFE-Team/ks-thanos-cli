import React from 'react';
import { getComponents } from 'Src/modules/EditorPage/utils/constants';

export default (props: any) => {
    const componentMap = getComponents();
    const ComponentByName = componentMap[props.componentName].component;
    return <ComponentByName {...props} />;
};
