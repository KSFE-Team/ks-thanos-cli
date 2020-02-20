import { Component } from 'Src/factories/component/basic';

export class BasicComponent extends Component {
    toCode() { 
        return ''; 
    }
}

export interface FileImport {
    [source: string]: {
        name: string;
        defaultImport: boolean;
    }[];
}
