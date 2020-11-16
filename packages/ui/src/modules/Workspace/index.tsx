import React, { useState } from 'react';
import { EnterOutlined } from '@ant-design/icons';
import { actions } from 'kredux';
import { useSelector } from 'react-redux';
import router from 'kredux/output/router';
import Menu from 'Src/components/Menu';
import Logo from 'Src/components/Logo';
import Button from 'Src/components/Button';
import { goto, getObjectStorage } from 'Src/utils';
import { ROUTE_LIST } from './routes';
import NoMatch from './component/NoMatch';
import './style.scss';

const { Route, Switch } = router;

interface WorkSpaceProps {
    match: any;
}

export default ({ match }: WorkSpaceProps) => {
    useState(() => {
        const project = getObjectStorage('currentProject');
        actions.workspace.setReducers({
            currentProject: project,
            cwd: project.path,
        });
    });
    const { workspace } = useSelector((store: any) => ({ workspace: store.workspace }));
    const { currentProject } = workspace;
    return (
        <div className="workspace">
            <div className="workspace-header">
                <Button
                    className="workspace-header-tools"
                    onClick={() => {
                        goto.push('/');
                    }}
                >
                    <EnterOutlined />
                </Button>
                <div className="workspace-header-project-name">{currentProject.name}</div>
                <div className="workspace-header-logo">
                    <Logo />
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
