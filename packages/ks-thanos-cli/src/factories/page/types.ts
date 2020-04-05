export interface Import {
    name: string;
    source: string;
    defaultImport: boolean;
}

export interface VariableDeclaration {
    name: string; // 变量名称
    source: string; // 变量来源
}

export interface VariableFromState {
    key: string; // 变量名称
    value: string; // 变量来源
}