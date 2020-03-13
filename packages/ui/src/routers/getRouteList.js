import routes from './routes';

let pathname = '';

const getRouteList = () => {
    return routes.map((route) => ({
        ...route,
        path: pathname + route.path,
        component: route.component,
        modelList: route.modelList || []
    }));
};

export default getRouteList;
