import routes from './routes';

let pathname = '/';
if (__DEV__) {
    pathname = '/h5/ks-project';
} else {
    pathname = '';
}

const getRouteList = () => {
    return routes.map((route) => ({
        ...route,
        path: pathname + route.path,
        component: route.component,
        modelList: route.modelList || []
    }));
};

export default getRouteList;
