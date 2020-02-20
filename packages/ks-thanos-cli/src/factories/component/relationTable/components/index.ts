import { BasicComponent } from 'Src/utils/types/basic';
import { SearchForm } from './searchForm';
import { Table } from './table';
/* 父子级组件 */
export const RELATION_TABLE_COMPONENTS: {
    [name: string]: typeof BasicComponent;
} = {
    Table: Table, // 列表组件
    KSTable: Table, //
    Form: SearchForm, // 表单组件
};