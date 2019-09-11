import { Table } from 'Src/factories/component/table/index';
import { Form } from 'Src/factories/component/form';
import { Input } from 'Src/factories/component/input';
import { BasicComponent } from '../types/basic';
import { ClickableComponent } from 'Src/factories/component/clickableComponent';
import { Select } from 'Src/factories/component/select';
import { RangePicker } from 'Src/factories/component/rangePicker';
import { TextArea } from 'Src/factories/component/textArea';
import { Radio } from 'Src/factories/component/radio';
import { InputNumber } from 'Src/factories/component/inputNumber';
import { Checkbox } from 'Src/factories/component/checkbox';
import { DatePicker } from 'Src/factories/component/datePicker';


export const COMPONENT_TYPES_MAP: {
    [name: string]: typeof BasicComponent;
} = {
    Table: Table, // 列表组件
    Form: Form, // 表单组件
    Input: Input, // input组件
    a: ClickableComponent,
    Button: ClickableComponent,
    Select: Select,
    Checkbox: Checkbox, // 复选框组件
    RangePicker: RangePicker,
    Textarea: TextArea, // 文本框组件
    InputNumber: InputNumber,
    Radio,
    DatePicker: DatePicker
};
