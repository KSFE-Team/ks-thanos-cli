export default interface RouteProps {
    history: Window['history'];
    location: {
        hash: string;
        key: string;
        pathname: string;
        search: string;
        state?: string;
    };
    staticContext?: any;
    match: {
        isExact: boolean;
        path: string;
        url: string;
        params: {
            [id: string]: any;
        };
        query: {
            [key: string]: any;
        };
    };
}
