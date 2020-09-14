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
        path: '/workspace/template',
        name: '物料库',
        // extra: true,
        component: dynamic({
            component: () => import('./Template')
        })
    }
];
