import { Component, ComponentConfig } from '../basic/index';
import { FormDecoratorConfig } from 'Src/factories/decorator/types';
import { FormItem, FormItemConfig } from './formItem';
import { FormDecorator } from 'Src/factories/decorator/form';
import Page from 'Src/factories/page';
import { ListEffect } from 'Src/factories/model/effect/listEffect';
import { EffectConfig } from 'Src/factories/model/effect';

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

    constructor(page: Page, config: FormComponentConfig) {
        super(page, config);
        this.config = config;

        const activeEvent = this.config.activeEvent || {};
        const activeEventType = activeEvent.eventType;

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
                source: 'ks-cms-ui',
                name: 'KSWhiteCard',
                defaultImport: false
            }
        ]);
        if (this.config.type === 'search') {
            imports.push({
                source: 'ks-cms-ui',
                name: 'KSSearchForm',
                defaultImport: false
            });
        } else {
            imports.push({
                source: 'antd',
                name: 'Button',
                defaultImport: false
            });
        }
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
        if (this.effect && this.effect.responseType === 'list' && this.config.type === 'search') {
            const pageModel = this.page.model;
            this.page.addMethod(`
                ${this.stateName}Reset() {
                    actions.${pageModel.namespace}.setReducers({
                        ${this.stateName}: {
                            ...this.props.${pageModel.namespace}.${this.stateName},
                            page: 1
                        }
                    });
                    this.${this.effect.name}();
                }
            `);
        }
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
    }

    getButtonCode() {
        return ``;
    }

    toSearchFormItemCode(item: FormItem) {
        return `{
                key: '${item.config.key}',
                title: '${item.config.label}',
                component: ${item.toCode()}
            }`;
    }

    toNormalFormItemCode(item: FormItem) {
        return `<Form.Item label={${item.config.label}}>
            {
                this.props.Form.getFieldDecorator('${item.config.key}', ${item.getDecoratorConfigCode()})(
                    ${item.toCode()}
                )
            }
        </Form.Item>`;
    }

    toCode() {
        if (this.config.type === 'search') {
            return `<KSWhiteCard>
                <Form>
                    <KSSearchForm
                        form={this.props.form}
                        components={[
                            ${this.components.map(this.toSearchFormItemCode).join(',\n')}
                        ]}
                    />
                </Form>
            </KSWhiteCard>`;
        }

        const componentsCode = this.components.map(this.toNormalFormItemCode);
        const buttonCode = this.getButtonCode();
        return `<Form>
        ${componentsCode.join('\n')}
        ${buttonCode}
    </Form>`;
    }
}
