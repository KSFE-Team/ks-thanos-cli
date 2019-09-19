import { Form } from '../index';
import { Import } from 'Src/factories/page/types';

export abstract class FormDelegate {
    form: Form;

    constructor(form: Form) {
        this.form = form;
    }

    initPageDecorators?(): void;
    initPageMethods?(): void;
    initPageTitle?(): void;
    abstract getImports(): Import[];
    abstract toCode(): string;
}
