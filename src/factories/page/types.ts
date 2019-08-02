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

export interface Decorator {
    name: 'connect' | 'Form.create';
}

export interface ConnectDecorator extends Decorator {
    name: 'connect';
    inputProps: string[];
}

export interface FormDecorator extends Decorator {
    name: 'Form.create';
    formItems: string[];
}

export interface ComponentStateProps {
    name: string;
    value: any;
}