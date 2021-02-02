import { isDevEnv } from 'Src/utils';

// 路由配置
const routesEdit = [
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
const routesPreview = routesEdit.filter(({ path }) => {
    return path !== '/';
});
export default (isDevEnv() ? routesEdit : routesPreview);
