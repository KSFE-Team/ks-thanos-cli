import { BasicElement } from '../basicElement/index';

export abstract class Decorator extends BasicElement {
    abstract getOutputPropTypesCode(): string;
}
