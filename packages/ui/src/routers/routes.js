// 路由配置
const Routes = [
    {
        path: '/',
        exact: true,
        component: () => import('Modules/HomePage'),
        modelList: [
            () => import('Models/project')
        ]
    },
    {
        path: '/auth',
        exact: true,
        component: () => import('Modules/Auth')
    },
    {
        path: '/project',
        exact: true,
        component: () => import('Modules/project'),
        modelList: [
            () => import('Models/project')
        ]
    },
];

export default Routes;
