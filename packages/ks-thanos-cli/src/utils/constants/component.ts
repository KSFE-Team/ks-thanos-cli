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
import { ExtendContainer } from 'Src/factories/component/extendContainer';
import { Row } from 'Src/factories/component/row';
import { Col } from 'Src/factories/component/col';
import { KSWhiteCard } from 'Src/factories/component/ksWhiteCard';
import {
    BizSelectModal,
    BizSelectUpload,
    BizSelectTags,
    BizTimingSetting,
    BizSelectTypeContent,
    Conditions
} from 'Src/factories/component/cloudComponent'; // 云组件

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
    KSDatePicker: DatePicker,
    Fragment: Fragment,
    ExtendContainer: ExtendContainer,
    Row: Row,
    Col: Col,
    BizSelectModal: BizSelectModal,
    BizSelectUpload: BizSelectUpload,
    BizSelectTags: BizSelectTags,
    BizTimingSetting: BizTimingSetting,
    BizSelectTypeContent: BizSelectTypeContent,
    KSWhiteCard: KSWhiteCard,
    Conditions: Conditions
};
