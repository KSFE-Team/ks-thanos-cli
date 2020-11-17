// 路由配置
const Routes = [
    {
        path: '/',
        exact: true,
        component: () => import('Modules/HomePage'),
        modelList: [
            () => import('Modules/HomePage/model')
        ]
    },
    {
        path: '/auth',
        exact: true,
        component: () => import('Modules/Auth')
    },
    {
        path: '/workspace',
        // exact: false,
        component: () => import('Modules/Workspace'),
        modelList: [
            () => import('Modules/Workspace/model')
        ]
    },
    {
        path: '/editor/:id',
        name: '编辑器',
        extra: true,
        // hide: true,
        component: () => import('Modules/EditorPage'),
        modelList: [
            () => import('Src/modules/EditorPage/model')
        ]
    },
];

export default Routes;
