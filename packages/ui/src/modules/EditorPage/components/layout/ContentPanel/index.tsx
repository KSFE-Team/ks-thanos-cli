import React, { useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import BlockGroup from './ContentBlock';
import './style.scss';

export default () => {
    const [visible, setVisible] = useState(false);
    return (
        <div
            className="thanos-editor-bar"
            onMouseLeave={() => {
                setVisible(false);
            }}
        >
            <div className="thanos-editor-bar-actions">
                {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
                <div
                    className="thanos-editor-btn"
                    onMouseOver={() => {
                        setVisible(true);
                    }}
                >
                    <div>
                        <PlusCircleOutlined />
                    </div>
                    添加内容
                </div>
            </div>
            <div
                className="thanos-editor-bar-drawar"
                style={{
                    transform: `translateX(${visible ? '0' : '-100%'})`,
                }}
            >
                <div className="thanos-editor-bar-drawar-drop-container">
                    <div className="thanos-editor-blocks">
                        <BlockGroup />
                        <BlockGroup />
                    </div>
                </div>
            </div>
        </div>
    );
};
