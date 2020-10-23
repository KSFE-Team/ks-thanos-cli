import React from 'react';
import { renderComponent } from '../../utils/index';

const componentData = [
    {
        componentId: 1,
        componentName: 'Form',
        config: {},
        children: [
            {
                componentId: 2,
                componentName: 'Input',
                config: { label: '姓名', key: 'name' },
            },
            {
                componentId: 3,
                componentName: 'Input',
                config: { label: '年龄', key: 'age' },
            },
        ],
    },
];

export default () => {
    return (
        <div className="thanos-editor-draw">
            hi,我是视图区域
            {renderComponent(componentData)}
        </div>
    );
};
