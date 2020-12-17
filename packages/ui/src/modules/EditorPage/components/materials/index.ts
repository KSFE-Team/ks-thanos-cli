import * as Form from './Form/index';
import * as Input from './Input/index';
import * as Select from './Select/index';
import * as Checkbox from './Checkbox/index';
import * as KSDatePicker from './DatePicker/index';
import * as RangePicker from './RangePicker/index';
import * as Radio from './Radio/index';
import * as TextArea from './TextArea/index';
import * as InputNumber from './InputNumber/index';
import * as BizSelectModal from './BizSelectModal/index';
import * as BizTimingSetting from './BizTimingSetting/index';
import * as BizSelectTags from './BizSelectTags/index';
import * as ExtendContainer from './ExtendContainer/index';
import * as BizSelectTypeContent from './BizSelectTypeContent/index';
import * as Fragment from './Fragment/index';
import * as Row from './Row/index';
import * as Conditions from './Conditions/index';
import * as Table from './Table';
import * as Col from './Col/index';
import * as KSWhiteCard from './KSWhiteCard/index';
import * as BizSelectUpload from './BizSelectUpload/index';

const COMPONENTS_DICT = {
    Form,
    Input,
    Checkbox,
    KSDatePicker,
    RangePicker,
    Radio,
    Select,
    TextArea,
    InputNumber,
    BizSelectModal,
    BizTimingSetting,
    BizSelectTags,
    ExtendContainer,
    BizSelectTypeContent,
    Fragment,
    Row,
    Conditions,
    Table,
    Col,
    KSWhiteCard,
    BizSelectUpload,
};

export default COMPONENTS_DICT;

export const getComponentsCount = () => Object.keys(COMPONENTS_DICT).length;
