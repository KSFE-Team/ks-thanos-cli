import { dynamic } from 'kredux';
export const ROUTE_LIST = [
    {
        path: '/workspace/blocks/existingPage',
        name: '现有页面',
        // extra: true,
        component: dynamic({
            component: () => import('../ExistingPage')
        })
    },
    {
        path: '/workspace/blocks/tempLateMgt',
        name: '现有模版',
        // extra: true,
        component: dynamic({
            component: () => import('../TempLateMgt')
        })
    },
    {
        path: '/workspace/blocks/dashboard',
        name: '数据分析',
        // extra: true,
        component: dynamic({
            component: () => import('../Dashboard'),
            modelList: [
                () => import('../Dashboard/model')
            ]
        })
    },
];
