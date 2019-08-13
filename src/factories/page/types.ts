export interface Import {
    [source: string]: {
        name: string;
        defaultImport: boolean;
    }[];
}

export interface BasciImport {
    name: string;
    source: string;
    defaultImport: boolean;
}

export interface ComponentStateProps {
    name: string;
    value: any;
}