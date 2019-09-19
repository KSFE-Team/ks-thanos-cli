import { Component, ComponentConfig } from '../basic/index';
import { FormDecoratorConfig } from 'Src/factories/decorator/types';
import { FormItem, FormItemConfig } from '../formItem';
import { FormDecorator } from 'Src/factories/decorator/form';
import Page from 'Src/factories/page';
import { ListEffect } from 'Src/factories/model/effect/listEffect';
import { EffectConfig } from 'Src/factories/model/effect';
import { SearchFormDelegate } from './searchForm/index';
import { NormalFormDelegate } from 'Src/factories/component/form/normalForm';
import { FormDelegate } from './formDelegate/index';

/**
 * 表单组件配置
 */
export interface FormComponentConfig extends ComponentConfig {
    components: FormItemConfig[]; // 子组件
    type: 'search' | 'normal';
    activeEvent: { // 触发事件
        eventType: string; // 事件类型
        dependencies: EffectConfig; // 数据依赖
    };
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

        const activeEvent = this.config.activeEvent || {};
        const activeEventType = activeEvent.eventType;

        if (this.config.type === 'search') {
            this.delegate = new SearchFormDelegate(this);
        } else {
            this.delegate = new NormalFormDelegate(this);
        }

        if (activeEventType === 'api') {
            this.effect = new ListEffect(this.stateName, page.model, config.activeEvent.dependencies);
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
            {
                source: 'antd',
                name: 'Button',
                defaultImport: false
            },
            ...this.delegate.getImports()
        ]);
        return imports;
    }

    initEffects() {
        const pageModel = this.page.model;
        if (this.effect) {
            if (!pageModel.getEffect(this.effect.name)) {
                pageModel.addEffect(this.effect);
            }
        }
    }

    initPageMethods() {
        this.delegate.initPageMethods && this.delegate.initPageMethods();
    }

    initPageDecorators() {
        const decoratorConfig: FormDecoratorConfig = {
            name: 'Form.create',
            type: this.config.type,
            pageName: this.page.pageName,
            stateName: this.stateName,
            formItems: this.components.map((item) => (item as FormItem).config.key)
        };
        const decorator = new FormDecorator(decoratorConfig);
        this.page.addDecorator(decorator);

        this.delegate.initPageDecorators && this.delegate.initPageDecorators();
    }

    toCode() {
        return this.delegate.toCode();
    }
}
