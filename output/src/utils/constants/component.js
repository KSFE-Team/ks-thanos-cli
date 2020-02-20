"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("Src/factories/component/table/index");
const input_1 = require("Src/factories/component/input");
const clickableComponent_1 = require("Src/factories/component/clickableComponent");
const select_1 = require("Src/factories/component/select");
const rangePicker_1 = require("Src/factories/component/rangePicker");
const textarea_1 = require("Src/factories/component/textarea");
const radio_1 = require("Src/factories/component/radio");
const inputNumber_1 = require("Src/factories/component/inputNumber");
const checkbox_1 = require("Src/factories/component/checkbox");
const datePicker_1 = require("Src/factories/component/datePicker");
const index_2 = require("Src/factories/component/form/index");
const fragment_1 = require("Src/factories/component/fragment");
const relationTable_1 = require("Src/factories/component/relationTable");
exports.COMPONENT_TYPES_MAP = {
    Table: index_1.Table,
    KSTable: index_1.Table,
    Form: index_2.Form,
    Input: input_1.Input,
    a: clickableComponent_1.ClickableComponent,
    Button: clickableComponent_1.ClickableComponent,
    Select: select_1.Select,
    Checkbox: checkbox_1.Checkbox,
    RangePicker: rangePicker_1.RangePicker,
    Textarea: textarea_1.Textarea,
    InputNumber: inputNumber_1.InputNumber,
    Radio: radio_1.Radio,
    DatePicker: datePicker_1.DatePicker,
    Fragment: fragment_1.Fragment,
    RelationTable: relationTable_1.RelationTable
};
//# sourceMappingURL=component.js.map