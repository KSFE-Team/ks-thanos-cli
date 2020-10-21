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
    {
        path: '/workspace',
        // exact: false,
        component: () => import('Modules/Workspace'),
        modelList: [
            () => import('Models/project')
        ]
    },
    {
        path: '/editor',
        name: '编辑器',
        extra: true,
        // hide: true,
        component: () => import('Modules/EditorPage'),
        modelList: [
            () => import('Modules/EditorPage/components/Page/model')
        ]
    },
    // {
    //     path: '/workspace/a',
    //     exact: false,
    //     component: () => import('Modules/Workspace/routes/A'),
    //     // modelList: [
    //     //     () => import('Models/project')
    //     // ]
    // },
    // {
    //     path: '/workspace/b',
    //     exact: false,
    //     component: () => import('Modules/Workspace/routes/B'),
    //     // modelList: [
    //     //     () => import('Models/project')
    //     // ]
    // },
];

export default Routes;
