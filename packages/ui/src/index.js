import React from 'react';
import kredux, { dynamic } from 'kredux';
import getRouteList from './routers/getRouteList';
import { browserHistory } from './routers/utils';
import Loading from './components/Loading';

// 导入样式文件
import './styles/index.scss';

dynamic.setDefaultLoadingComponent(Loading);

const app = kredux({
    history: browserHistory
});
app.router(getRouteList());
app.render(
    <div />,
    '#app'
);
