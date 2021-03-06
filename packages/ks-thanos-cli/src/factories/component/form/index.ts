import { Component, ComponentConfig } from '../basic/index';
import { FormDecoratorConfig } from 'Src/factories/decorator/types';
import { FormItem, FormItemConfig } from '../formItem';
import { FormDecorator } from 'Src/factories/decorator/form';
import Page from 'Src/factories/page';
import { EffectConfig } from 'Src/factories/model/effect';
import { SearchFormDelegate } from './searchForm/index';
import { NormalFormDelegate } from './normalForm';
import { ModalFormDelegate } from './modalForm';
import { FormDelegate } from './formDelegate/index';

/**
 * 表单组件配置
 */
export interface FormComponentConfig extends ComponentConfig {
    components: FormItemConfig[]; // 子组件
    type: 'search' | 'normal' | 'modal';
    paramKey: string;
    activeEvents: { // 触发事件
        eventType: 'request' | 'link' | 'modal'; // 事件类型
        dependencies: EffectConfig; // 数据依赖
    }[];
}

/**
 * 表单组件
 */
export class Form extends Component {

    config: FormComponentConfig // 组件配置
    components: FormItem[] = [];
    delegate: FormDelegate;

    constructor(page: Page, config: FormComponentConfig) {
        super(page, config);
        this.config = config;
        this.page.form.type = this.config.type;
        this.page.form.stateName = this.config.stateName;
        switch (this.config.type) {
            case 'search':
                this.delegate = new SearchFormDelegate(this);
                break;
            case 'modal':
                this.delegate = new ModalFormDelegate(this);
                break;
            case 'normal':
            default:
                this.delegate = new NormalFormDelegate(this);
                break;
        }
    }

    getImports() {
        let imports = super.getImports();
        imports = imports.concat([
            {
                source: 'kredux',
                name: 'actions',
                defaultImport: false
            },
            ...this.delegate.getImports()
        ]);
        return imports;
    }

    initEffects() {
        this.delegate.initEffects && this.delegate.initEffects();
    }

    initPageMethods() {
        this.delegate.initPageMethods && this.delegate.initPageMethods();
    }

    initPageState() {
        this.delegate.initPageState && this.delegate.initPageState();
    }

    initPageDecorators() {
        const decoratorConfig: FormDecoratorConfig = {
            name: 'Form.create',
            type: this.config.type,
            pageName: this.page.pageName,
            namespaceValue: this.page.namespaceValue,
            stateName: this.stateName,
            formItems: this.components.map((item: FormItem) => item.config.key)
        };
        const decorator = new FormDecorator(decoratorConfig);
        this.page.addDecorator(decorator);

        this.delegate.initPageDecorators && this.delegate.initPageDecorators();
    }

    initPageTitle() {
        this.delegate.initPageTitle && this.delegate.initPageTitle();
    }

    initPageLifecycle() {
        this.delegate.initPageLifeCycle && this.delegate.initPageLifeCycle();
    }

    initStateVariableDeclaration() {
        this.delegate.initStateVariableDeclaration && this.delegate.initStateVariableDeclaration();
    }

    initRenderVariableDeclaration() {
        this.delegate.initRenderVariableDeclaration && this.delegate.initRenderVariableDeclaration();
    }

    initPropTypesCodes() {
        this.delegate.initPropTypesCodes && this.delegate.initPropTypesCodes();
    }

    toCode() {
        return this.delegate.toCode();
    }
}
