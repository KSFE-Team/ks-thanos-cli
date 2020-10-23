import * as Form from './Form/index';
import * as Input from './Input/index';

export { Form, Input };
/**
 * 展示类组件
 */
const SHOW_COMPONENTS = {
    Input,
};

/**
 * 其他组件
 */
const OTHER_COMPONENTS = {
    Form,
};

const ALL_COMPONENTS = {
    ...SHOW_COMPONENTS,
    ...OTHER_COMPONENTS,
};

export { ALL_COMPONENTS };
