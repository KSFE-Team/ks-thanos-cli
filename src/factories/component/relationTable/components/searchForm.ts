import { Component, ComponentConfig } from '../../basic/index';
import { FormItemConfig, FormItem } from '../../formItem';
import { FormDecoratorConfig } from 'Src/factories/decorator/types';
import { FormDecorator } from 'Src/factories/decorator/form';
import { EffectConfig, Effect } from 'Src/factories/model/effect';
import { EffectManager } from 'Src/factories/model/effect/manager';
import Page from 'Src/factories/page';
import Debug from 'Src/utils/debugger';

const debug = Debug(__filename);

/**
 * 表单组件配置
 */
export interface FormComponentConfig extends ComponentConfig {
    components: FormItemConfig[]; // 子组件
    type: 'search' | 'normal';
    paramKey: string;
    activeEvents: { // 触发事件
        eventType: 'request' | 'link' | 'modal'; // 事件类型
        dependencies: EffectConfig; // 数据依赖
    }[];
    relationId: string; // 关联ID
}

/**
 * 表单组件
 */
export class SearchForm extends Component {

    listEffect: Effect | undefined
    page: any;

    constructor(page: Page, config: FormComponentConfig) {
        super(page, config);
        this.page = page;
        const activeEvents = config.activeEvents || [];
        activeEvents.forEach((activeEvent) => {
            const activeEventType = activeEvent.eventType;
            debug(`NormalForm activeEvent: ${JSON.stringify(activeEvent)}`);
            if (activeEventType === 'request') {
                debug('生成 listEffect');
                let dependencies = activeEvent.dependencies;
                if (config.relationId) {
                    // 暂时只找第一层级
                    const relationComponent = this.page.pageComponents.find((component: any) => `${component.id}` === `${config.relationId}`);
                    if (relationComponent) {
                        dependencies = {
                            ...dependencies,
                            showSelectedRows: relationComponent.showSelectedRows
                        };
                    }
                }
                this.listEffect = EffectManager.create(
                    this.stateName,
                    this.page.model,
                    dependencies
                );
            }
        });
        if (!this.listEffect) {
            debug('SearchForm 缺少 listEffect');
        }
    }

    getImports() {
        let imports = super.getImports();
        imports = imports.concat([
            {
                source: 'antd',
                name: 'Button',
                defaultImport: false
            },
            {
                source: 'ks-cms-utils',
                name: 'goto',
                defaultImport: false
            },
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
        ]);
        return imports;
    }

    initEffects() {
        const pageModel = this.page.model;
        if (this.listEffect) {
            if (!pageModel.getEffect(this.listEffect.name)) {
                pageModel.addEffect(this.listEffect);
            }
        }
    }

    initPageMethods() {
        const page = this.page;
        if (this.listEffect) {
            const pageModel = page.model;
            page.addMethod(`
                ${this.stateName}Reset() {
                    actions.${pageModel.namespace}.setReducers({
                        ${this.stateName}: {
                            ...this.props.${pageModel.namespace}.${this.stateName},
                            page: 1
                        }
                    });
                    this.${this.listEffect.name}();
                }
            `);
        }
    }

    initPageState() {
        // this.delegate.initPageState && this.delegate.initPageState();
    }

    initPageDecorators() {
        const decoratorConfig: FormDecoratorConfig = {
            name: 'Form.create',
            type: 'search',
            pageName: this.page.pageName,
            stateName: this.stateName,
            formItems: this.components.map((item) => (item as FormItem).config.key)
        };
        const decorator = new FormDecorator(decoratorConfig);
        this.page.addDecorator(decorator);
    }

    initPageTitle() {
        // this.delegate.initPageTitle && this.delegate.initPageTitle();
    }

    initPageLifecycle() {
        // this.delegate.initPageLifeCycle && this.delegate.initPageLifeCycle();
    }

    toFormItemCode = (item: any) => {
        return `<Col span={3}>
            <Form.Item className='mar-b-0'>
                {
                    this.props.form.getFieldDecorator('${item.config.key}')(
                        ${item.toCode()}
                    )
                }
            </Form.Item>
        </Col>`
    }

    toCode() {
        
        return `<Form>
            <Row>
                <Col
                    span={2}
                    className='line-h-40'
                >
                    ${this.page.pageChineseName || ''}
                </Col>
                ${this.components.map(this.toFormItemCode).join('\n')}
                <Col span={6}>
                    <Form.Item className='mar-b-0'>
                        <Button
                            onClick={() => {
                                this.Reset();
                            }}
                            className='mar-l-4'
                        >查询</Button>
                        <Button
                            className='mar-l-4'
                            type='primary'
                            onClick={() => {
                                goto.push('')
                            }}
                        >新增</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>`
    }
}
