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
];
