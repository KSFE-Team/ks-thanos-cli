import { Table } from 'Src/factories/component/table/index';
import { Form } from 'Src/factories/component/form';
import { Input } from 'Src/factories/component/input';
import { BasicComponent } from '../types/basic';
import { ClickableComponent } from 'Src/factories/component/clickableComponent';
import { RangePicker } from 'Src/factories/component/rangePicker';

export const COMPONENT_TYPES_MAP: {
    [name: string]: typeof BasicComponent;
} = {
    Table: Table, // 列表组件
    Form: Form, // 表单组件
    Input: Input, // input组件
    a: ClickableComponent,
    Button: ClickableComponent,
    RangePicker: RangePicker,
};
