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

    constructor(page: Page, config: FormComponentConfig) {
        super(page, config);
        this.config = config;

        const activeEvent = this.config.activeEvent;
        const activeEventType = activeEvent.eventType;

        if (activeEventType === 'api') {
            this.effect = new ListEffect(this.stateName, page.model, config.activeEvent.dependencies);
        }
    }

    getImports() {
        let imports = super.getImports();
        imports = imports.concat([
            {
                source: 'antd',
                name: 'Row',
                defaultImport: false
            },
            {
                source: 'antd',
                name: 'Col',
                defaultImport: false
            },
            {
                source: 'kredux',
                name: 'actions',
                defaultImport: false
            }
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

    getButtonCode(){
        if(this.config.type === 'search') {
            return `<Col span={3}>
            <Button onClick={() => {
                this.${this.stateName}Reset();
            }}>
                查询
            </Button>
            </Col>`;
        } else {
            return ``;
        }
    }

    toCode() {
        const componentsCode = this.components.map((item) => `<Col span={3}>
            ${item.toCode()}
        </Col>`);
        const buttonCode = this.getButtonCode();
        return`
<${this.componentName}>
    <Row>
        ${componentsCode.join('\n')}
        ${buttonCode}
    </Row>
</${this.componentName}>
`;
    }
}
