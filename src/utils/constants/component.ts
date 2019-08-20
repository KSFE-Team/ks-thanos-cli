import { Table } from 'Src/factories/component/table/index';
import { Form } from 'Src/factories/component/form';
import { Input } from 'Src/factories/component/input';
import { BasicComponent } from '../types/basic';

export const COMPONENT_TYPES_MAP: {
    [name: string]: typeof BasicComponent;
} = {
    table: Table, // 列表组件
    Form: Form, // 表单组件
    Input: Input // input组件
};
