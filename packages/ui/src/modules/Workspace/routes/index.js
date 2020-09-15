import { dynamic } from 'kredux';
export const ROUTE_LIST = [
    {
        path: '/workspace/config',
        name: '配置',
        // extra: true,
        component: dynamic({
            component: () => import('./Config')
        })
    },
    {
        path: '/workspace/running',
        name: '运行',
        // extra: true,
        component: dynamic({
            component: () => import('./Running')
        })
    },
    {
        path: '/workspace/blocks',
        name: '资产',
        // extra: true,
        component: dynamic({
            component: () => import('../../Blocks')
        })
    }
];
