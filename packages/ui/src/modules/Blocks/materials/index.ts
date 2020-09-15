import * as Table from './Table/index';
import * as RelationTable from './RelationTable/index';
import * as Input from './Input/index';
import * as Select from './Select/index';
import * as DatePicker from './DatePicker/index';
import * as InputNumber from './InputNumber/index';
import * as RangePicker from './RangePicker/index';
import * as Textarea from './Textarea/index';
import * as Radio from './Radio/index';
import * as Checkbox from './Checkbox/index';
import * as Form from './Form';
import * as Fragment from './Fragment';
import * as BizSelectModal from './BizSelectModal';
/**
 * 展示类组件
 */
const DATA_ENTRY = {
    Input,
    Select,
    DatePicker,
    InputNumber,
    RangePicker,
    Textarea,
    Radio,
    Checkbox,
    Fragment
};

/**
 * 展示类组件
 */
const DATA_DISPLAY = {
    Table
};

/**
 * 其他组件
 */
const OTHER_COMPONENTS = {
    Form
};

/*
 * 父子Table
 */
const RELATION_TABLE = {
    RelationTable
};

/**
 * 获取录入组件
 */
const getDataEntry = () => DATA_ENTRY;

/**
 * 云组件
 */
const CLOUD_COMPONENTS = {
    BizSelectModal
};

/**
 * 获取云组件
 */
const getCloudComponents = () => CLOUD_COMPONENTS;

/**
 * 所有组件
 */
const ALL_TOOLS = {
    ...DATA_DISPLAY,
    ...DATA_ENTRY,
    ...OTHER_COMPONENTS,
    ...RELATION_TABLE,
    ...CLOUD_COMPONENTS
};

export {
    DATA_DISPLAY,
    RELATION_TABLE,
    DATA_ENTRY,
    OTHER_COMPONENTS,
    ALL_TOOLS,
    getDataEntry,
    getCloudComponents
};
