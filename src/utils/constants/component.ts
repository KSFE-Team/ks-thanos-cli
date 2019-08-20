import { Table } from 'Src/factories/component/table/index';
import { Form } from 'Src/factories/component/form';
import { Input } from 'Src/factories/component/input';

export const COMPONENT_TYPES_MAP: {
    [name: string]: any;
} = {
    table: Table,
    Form: Form,
    Input: Input
};
