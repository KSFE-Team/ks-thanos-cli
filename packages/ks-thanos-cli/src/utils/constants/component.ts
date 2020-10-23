import { Table } from 'Src/factories/component/table/index';
import { Input } from 'Src/factories/component/input';
import { BasicComponent } from '../types/basic';
import { ClickableComponent } from 'Src/factories/component/clickableComponent';
import { Select } from 'Src/factories/component/select';
import { RangePicker } from 'Src/factories/component/rangePicker';
import { Textarea } from 'Src/factories/component/textarea';
import { Radio } from 'Src/factories/component/radio';
import { InputNumber } from 'Src/factories/component/inputNumber';
import { Checkbox } from 'Src/factories/component/checkbox';
import { DatePicker } from 'Src/factories/component/datePicker';
import { Form } from 'Src/factories/component/form/index';
import { Fragment } from 'Src/factories/component/fragment';
import { RelationTable } from 'Src/factories/component/relationTable';
import { ExtendContainer } from 'Src/factories/component/extendContainer';


export const COMPONENT_TYPES_MAP: {
    [name: string]: typeof BasicComponent;
} = {
    Table: Table, // 列表组件
    KSTable: Table, //
    Form: Form, // 表单组件
    Input: Input, // input组件
    a: ClickableComponent,
    Button: ClickableComponent,
    Select: Select,
    Checkbox: Checkbox, // 复选框组件
    RangePicker: RangePicker,
    Textarea: Textarea, // 文本框组件
    InputNumber: InputNumber,
    Radio,
    DatePicker: DatePicker,
    Fragment: Fragment,
    RelationTable: RelationTable,
    ExtendContainer: ExtendContainer
};
