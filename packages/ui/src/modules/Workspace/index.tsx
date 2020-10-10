import React, { useState } from 'react';
import { RollbackOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { actions } from 'kredux';
import router from 'kredux/output/router';
import Menu from 'Src/components/Menu';
import { goto, getObjectStorage } from 'Src/utils';
import { ROUTE_LIST } from './routes';
import NoMatch from './component/NoMatch';
import './style.scss';

const { Route, Switch } = router;

let project: any = {};

interface WorkSpaceProps {
    match: any;
}

export default ({ match }: WorkSpaceProps) => {
    useState(() => {
        project = getObjectStorage('currentProject') || {};
        if (!project) {
            message.error('选择的项目数据有误，请重新选择');
        } else {
            actions.project.setReducers({
                cwd: project.path,
            });
        }
    });
    return (
        <div className="workspace">
            <div className="workspace-header">
                <div
                    className="workspace-header-tools"
                    onClick={() => {
                        goto.push('/');
                    }}
                >
                    <RollbackOutlined />
                </div>
                <div className="workspace-header-project-name">{project.name}</div>
                <div className="workspace-header-title">
                    <span className="workspace-header-title-text">Thanos</span>
                </div>
                <div className="workspace-header-menu">
                    <Menu match={match} dataSource={ROUTE_LIST} />
                </div>
            </div>
            <Switch>
                {ROUTE_LIST.map((config) => {
                    return <Route key={config.path} {...config} />;
                })}
                <Route component={NoMatch} />
            </Switch>
        </div>
    );
};
