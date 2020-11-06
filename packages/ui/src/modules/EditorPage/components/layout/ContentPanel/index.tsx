import React, { useState } from 'react';
import BlockGroup from './ContentBlock';
import { getLayoutComponents, getEntryComponents } from '../../../utils/constants';
import './style.scss';

export default () => {
    const [tools] = useState(() => {
        return [
            {
                groupTitle: '布局组件',
                components: getLayoutComponents(),
            },
            {
                groupTitle: '录入组件',
                components: getEntryComponents(),
            },
        ];
    });
    return (
        <div className="thanos-editor-bar-drawar">
            <div className="thanos-editor-bar-drawar-drop-container">
                <div className="thanos-editor-blocks">
                    {tools.map((item, index) => {
                        return <BlockGroup data={item} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
};
