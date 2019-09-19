import { getPropValue } from 'Src/utils/getPropValue';
import { FormItem } from 'Src/factories/component/formItem';
import { FormDelegate } from '../formDelegate/index';
import { Effect } from 'Src/factories/model/effect/index';
import { Form } from '../index';
import { EffectManager } from 'Src/factories/model/effect/manager';
import { Value } from 'Src/factories/value';
import Debug from 'Src/utils/debugger';

const debug = Debug(__filename);

export class NormalFormDelegate extends FormDelegate {

    createEffect: Effect | undefined
    updateEffect: Effect | undefined

    constructor(form: Form) {
        super(form);

        const activeEvents = form.config.activeEvents || [];

        activeEvents.forEach((activeEvent) => {
            const activeEventType = activeEvent.eventType;
            const actionType = activeEvent.dependencies.actionType;
            debug(`NormalForm activeEvent: ${JSON.stringify(activeEvent)}`);
            if (activeEventType === 'request') {
                const effect = EffectManager.create(
                    form.stateName,
                    form.page.model,
                    activeEvent.dependencies
                );
                switch (actionType) {
                    case 'save':
                        debug('生成 createEffect');
                        this.createEffect = effect;
                        break;
                    case 'update':
                        debug('生成 updateEffect');
                        this.updateEffect = effect;
                }
            }
        });
        if (!this.createEffect || !this.updateEffect) {
            debug('NormalForm 缺少 createEffect 或 updateEffect');
        }
    }

    getImports() {
        let imports = [
            {
                source: 'Src/utils/constants',
                name: 'FORM_LAYOUT',
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
            {
                source: 'antd',
                name: 'Icon',
                defaultImport: false
            },
            {
                source: 'ks-cms-utils',
                name: 'goto',
                defaultImport: false
            }
        ];
        return imports;
    }

    initEffects() {
        const pageModel = this.form.page.model;
        const effects = [this.createEffect, this.updateEffect];
        effects.forEach((effect) => {
            if (!effect) {
                return;
            }
            if (!pageModel.getEffect(effect.name)) {
                pageModel.addEffect(effect);
            }
        });
    }

    initPageDecorators() {
        const form = this.form;

        if (this.createEffect && this.updateEffect) {
            form.page.updateConnectDecorator(
                ['loading'],
                [
                    new Value({
                        key: `requestLoading`,
                        value: `loading.effects['${form.page.pageName}/${this.createEffect.name}'] || loading.effects['${form.page.pageName}/${this.updateEffect.name}']`,
                        type: 'bool'
                    })
                ]
            );
        }
    }

    initPageMethods() {
        const form = this.form;
        if (!this.createEffect || !this.updateEffect) {
            return;
        }
        form.page.addMethod(`
            handleSubmit = () => {
                this.props.form.validateFieldsAndScroll({ force: true }, (err, fieldsValue) => {
                    if (err) {
                        return;
                    }
                    const { ${form.stateName} } = this.props.${form.page.pageName};
                    const postData = {
                        ...${form.stateName},
                        ...fieldsValue
                    };
                    const id = this.props.match.params.id;
                    if (id >= 0) {
                        actions.${form.page.pageName}.${this.updateEffect.name}(postData);
                    } else {
                        actions.${form.page.pageName}.${this.createEffect.name}(postData);
                    }
                });
            }
        `);
    }

    initPageTitle() {
        const form = this.form;
        form.page.initPageTitleCode(`
            <div>
                <Row>
                    <Col span={8} style={{ lineHeight: '32px' }}>
                        ${form.page.pageChineseName}
                    </Col>
                    <Col span={16} style={{ textAlign: 'right' }}>
                        <Button
                            type='primary'
                            className='mar-l-4'
                            loading={ this.props.requestLoading }
                            onClick={this.handleSubmit}
                        ><Icon type="form" />保存</Button>
                        <Button
                            className='mar-l-4'
                            onClick={() => {
                                goto.go(-1);
                            }}><Icon type="rollback" />返回</Button>
                    </Col>
                </Row>
            </div>
        `);
    }

    toFormItemCode(item: FormItem) {
        const labelValue = getPropValue(item.config.label);
        return `<Form.Item
                label={${labelValue}}
                { ...FORM_LAYOUT }
            >
            {
                this.props.form.getFieldDecorator('${item.config.key}', ${item.getDecoratorConfigCode()})(
                    ${item.toCode()}
                )
            }
        </Form.Item>`;
    }

    toCode() {
        const form = this.form;
        const componentsCode = form.components.map(this.toFormItemCode);
        return `<Form>
        ${componentsCode.join('\n')}
    </Form>`;
    }
}
