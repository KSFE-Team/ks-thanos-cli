import React from 'react';
import kredux, { dynamic, actions } from 'kredux';
import getRouteList from './routers/getRouteList';
import { browserHistory } from './routers/utils';
import Loading from './components/Loading';
import socket from 'Models/socket';
import global from 'Models/global';
import { setApp } from './app';
import './entry';
// 导入样式文件
import './styles/index.scss';

dynamic.setDefaultLoadingComponent(Loading);

const app = kredux({
    history: browserHistory
});
app.router(getRouteList());
app.model(socket);
app.model(global);
actions.socket.init();
app.render(
    <div />,
    '#app'
);
setApp(app);
