import { Form } from '../index';
import { Import } from 'Src/factories/page/types';

export abstract class FormDelegate {
    form: Form;

    constructor(form: Form) {
        this.form = form;
    }

    /**
     * 初始化页面的 decorator
     */
    initPageDecorators?(): void;

    /**
     * 初始化页面的方法
     */
    initPageMethods?(): void;

    /**
     * 初始页面的标题
     */
    initPageTitle?(): void;

    /**
     * 初始页面的状态
     */
    initPageState?(): void;

    /**
     * 初始页面生命周期
     */
    initPageLifeCycle?(): void;

    /**
     * 初始化state配置
     */
    initStateVariableDeclaration?(): void;

    /**
     * 初始化render前 变量配置
     */
    initRenderVariableDeclaration?(): void;

    /**
     * 初始effect
     */
    abstract initEffects(): void;

    /**
     * 获取import
     */
    abstract getImports(): Import[];

    /**
     * 生成代码
     */
    abstract toCode(): string;
}
