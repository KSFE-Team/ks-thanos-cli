import routes from './routes';
import { PATH_NAME } from 'Src/utils/constants';

const getRouteList = () => {
    return routes.map((route) => ({
        ...route,
        path: PATH_NAME + route.path,
        component: route.component,
        modelList: route.modelList || []
    }));
};

export default getRouteList;
