import { dynamic } from 'kredux';

interface RouteConfig {
    path: string;
    name: string;
    extra?: boolean;
    component: any;
}

export const ROUTE_LIST: RouteConfig[] = [
    {
        path: '/workspace/config',
        name: '配置',
        // extra: true,
        component: dynamic({
            component: () => import('./Config'),
        }),
    },
    {
        path: '/workspace/running',
        name: '运行',
        // extra: true,
        component: dynamic({
            component: () => import('./Running'),
        }),
    },
    {
        path: '/workspace/blocks',
        name: '资产',
        // extra: true,
        component: dynamic({
            component: () => import('./Template/Blocks'),
            modelList: [
                () => import('./Template/Blocks/ExistingPage/model/index'),
                () => import('./Template/Blocks/TempLateMgt/model/index'),
            ],
        }),
    },
];
