import React from 'react';
import kredux, { dynamic, actions } from 'kredux';
import getRouteList from './routers/getRouteList';
import { browserHistory } from './routers/utils';
import { isOnlyPreview} from './utils/index';
import Loading from './components/Loading';
// import socket from '';
import global from 'Models/global';
import { setApp } from './app';
import { PATH_NAME } from 'Src/utils/constants';
import { goto } from 'Src/utils';
import './entry';
// 导入样式文件
import './styles/index.scss';

dynamic.setDefaultLoadingComponent(Loading);

const app = kredux({
    history: browserHistory
});
app.router(getRouteList());
app.model(global);
if (!isOnlyPreview()) {
    const socket = require('Models/socket');
    app.model(socket.default);
    actions.socket.init();
}
app.render(
    <div />,
    '#app'
);
goto.setBaseUrl(PATH_NAME);
setApp(app);
