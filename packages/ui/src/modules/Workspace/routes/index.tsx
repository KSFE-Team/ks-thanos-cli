import { dynamic } from 'kredux';
import { isDevEnv } from 'Src/utils';

interface RouteConfig {
    path: string;
    name: string;
    extra?: boolean;
    component: any;
}

const ROUTE_LIST_EDIT: RouteConfig[] = [
    {
        path: '/workspace/running',
        name: '运行',
        // extra: true,
        component: dynamic({
            component: () => import('./Running'),
        }),
    },
    {
        path: '/workspace/config',
        name: '配置',
        // extra: true,
        component: dynamic({
            component: () => import('./Config'),
        }),
    },
    {
        path: '/workspace/blocks',
        name: '资产',
        // extra: true,
        component: dynamic({
            component: () => import('./Blocks'),
            modelList: [
                () => import('./Blocks/ExistingPage/model/index'),
                () => import('./Blocks/TempLateMgt/model/index'),
            ],
        }),
    },
];
const ROUTE_LIST_PREVIEW = ROUTE_LIST_EDIT.find(({ path }) => {
    return path === '/workspace/blocks';
});
export const ROUTE_LIST = isDevEnv() ? ROUTE_LIST_EDIT : [ROUTE_LIST_PREVIEW];
