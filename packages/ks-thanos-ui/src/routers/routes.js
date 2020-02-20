// 路由配置
const Routes = [
    {
        path: '/',
        exact: true,
        component: () => import('Modules/homePage')
    },
];

export default Routes;
