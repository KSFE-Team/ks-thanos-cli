export interface ComponentJSON {
    componentName: string;
    source: string;
    default: boolean;
    props?: {
        [key: string]: any;
    };
}
