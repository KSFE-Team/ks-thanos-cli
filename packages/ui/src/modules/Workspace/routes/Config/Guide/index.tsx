import React from 'react';
import { Button } from 'antd';
import './style.scss';

export default () => {
    return (
        <div className="guide-bar">
            <div className="guide-group-title">项目配置</div>
            <div className="guide-link">
                <Button type="link">基础配置</Button>
            </div>
        </div>
    );
};
