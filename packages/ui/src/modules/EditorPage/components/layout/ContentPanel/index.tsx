import React, { useState } from 'react';
import BlockGroup from './ContentBlock';
import {
    getContainerComponents,
    getContentComponents,
    getBasicComponents,
    getBizComponents,
} from '../../../utils/constants';
import './style.scss';

export default () => {
    const [tools] = useState(() => {
        return [
            {
                groupTitle: '容器组件',
                components: getContainerComponents(),
            },
            {
                groupTitle: '基础组件',
                components: getBasicComponents(),
            },
            {
                groupTitle: '内容组件',
                components: getContentComponents(),
            },
            {
                groupTitle: '云组件',
                components: getBizComponents(),
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
