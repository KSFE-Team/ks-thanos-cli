// 路由配置
const Routes = [
    {
        path: '/',
        exact: true,
        component: () => import('Modules/homePage')
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
