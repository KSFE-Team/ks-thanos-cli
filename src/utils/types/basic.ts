import { Component } from 'Src/factories/component/basic';
import { Import } from 'Src/factories/page/types';

export abstract class Element {
    abstract toCode(): string
}

export interface ComponentContainer {
    components: Component[];
    addComponent(component: Component): void;
    getImports(): Import[];
}

export abstract class Decorator extends Element {
    abstract name: string
    abstract stateName: string
    abstract pageName: string
}

export interface FileImport {
    [source: string]: {
        name: string;
        defaultImport: boolean;
    }[];
}
