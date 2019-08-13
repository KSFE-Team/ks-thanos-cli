interface Decorator {
    stateName: string;
    pageName: string;
}

export interface ConnectDecoratorConfig extends Decorator {
    name: 'connect';
    inputProps: string[];
    process: string[];
    outputProps: string[];
}

export interface FormDecoratorConfig  extends Decorator {
    name: 'Form.create';
    formItems: string[];
}
