import { dynamic } from 'kredux';
import { isOnlyPreview } from 'Src/utils';

interface RouteConfig {
    path: string;
    name: string;
    extra?: boolean;
    component: any;
}

const ROUTE_CONFIG: RouteConfig[] = [
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
];
const ROUTE_WORKSPACE = [
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

export const ROUTE_LIST = isOnlyPreview() ? ROUTE_WORKSPACE : [...ROUTE_CONFIG, ...ROUTE_WORKSPACE];
