import { Value } from '../value';

interface Decorator {
    pageName: string;
}

export interface ConnectDecoratorConfig extends Decorator {
    name: 'connect'; // 名称
    inputProps: string[]; // 输入属性
    outputProps: Value[]; // 输出属性
    process?: string[]; // 处理过程
}

export interface FormDecoratorConfig  extends Decorator {
    stateName: string;
    name: 'Form.create'; // 名称
    type: 'search' | 'normal' | 'modal'; // 类型
    formItems: string[]; // 表单中的子元素
}
