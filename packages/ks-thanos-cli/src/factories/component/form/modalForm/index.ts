import { FormItem } from 'Src/factories/component/formItem';
import { FormDelegate } from '../formDelegate/index';
import { Effect } from 'Src/factories/model/effect/index';
import { Form } from '../index';
import { EffectManager } from 'Src/factories/model/effect/manager';
import { Value } from 'Src/factories/value';
import Debug from 'Src/utils/debugger';

const debug = Debug(__filename);

export class ModalFormDelegate extends FormDelegate {

    getEffect: Effect | undefined
    createEffect: Effect | undefined
    updateEffect: Effect | undefined

    constructor(form: Form) {
        super(form);

        const activeEvents = form.config.activeEvents || [];
        this.form.page.isUseCard = false;
        activeEvents.forEach((activeEvent) => {
            const activeEventType = activeEvent.eventType;
            const actionType = activeEvent.dependencies.actionType;
            debug(`ModalForm activeEvent: ${JSON.stringify(activeEvent)}`);
            if (activeEventType === 'request') {
                const effect = EffectManager.create(
                    form.page.namespaceValue,
                    form.stateName,
                    form.page.model,
                    activeEvent.dependencies
                );
                switch (actionType) {
                    case 'get':
                        debug('生成 getEffect');
                        this.getEffect = effect;
                        break;
                    case 'save':
                        debug('生成 createEffect');
                        this.createEffect = effect;
                        break;
                    case 'update':
                        debug('生成 updateEffect');
                        this.updateEffect = effect;
                        break;
                }
            }
        });
        if (!this.createEffect || !this.updateEffect) {
            debug('ModalForm 缺少 createEffect 或 updateEffect');
        }
    }

    getImports() {
        let imports = [
            {
                source: 'Src/utils/constants',
                name: 'MODAL_FORM_LAYOUT',
                defaultImport: false
            },
            {
                source: 'antd',
                name: 'Modal',
                defaultImport: false
            },
        ];
        return imports;
    }

    initPageState() {
        const form = this.form;
        const pageModel = form.page.model;
        pageModel.addInitialState(`info`, '{}');
    }

    initEffects() {
        const pageModel = this.form.page.model;
        const effects = [this.getEffect, this.createEffect, this.updateEffect];
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
                        value: `loading.effects['${form.page.namespaceValue}/${this.createEffect.name}'] || loading.effects['${form.page.namespaceValue}/${this.updateEffect.name}']`,
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
        const { page } = this.form;
        const paramKey = this.form.config.paramKey || 'id';
        form.page.addMethod(`
            handleSubmit = () => {
                this.props.form.validateFieldsAndScroll({ force: true }, (err, fieldsValue) => {
                    if (err) {
                        return;
                    }
                    const { ${form.stateName} } = this.props.${form.page.namespaceValue};
                    const postData = {
                        ...${form.stateName},
                        ...fieldsValue
                    };
                    if (this.state.${paramKey} >= 0) {
                        actions.${form.page.namespaceValue}.${this.updateEffect.name}(postData);
                    } else {
                        actions.${form.page.namespaceValue}.${this.createEffect.name}(postData);
                    }
                });
            }
        `);
        form.page.addMethod(`
            handleCancel = () => {
                actions.${page.namespaceValue}.setReducers({
                    modalVisible: false
                });
            }
        `);
    }

    // initPageTitle() {
    //     const form = this.form;
    //     form.page.initPageTitleCode(`pageTitle={
    //         <div>
    //             <Row>
    //                 <Col span={8} style={{ lineHeight: '32px' }}>
    //                     ${form.page.pageChineseName}
    //                 </Col>
    //                 <Col span={16} style={{ textAlign: 'right' }}>
    //                     <Button
    //                         type='primary'
    //                         className='mar-l-4'
    //                         loading={ this.props.requestLoading }
    //                         onClick={ this.handleSubmit }
    //                     >
    //                         <Icon type="form" />保存
    //                     </Button>
    //                     <Button
    //                         className='mar-l-4'
    //                         onClick={() => {
    //                             goto.go(-1);
    //                         }}
    //                     >
    //                         <Icon type="rollback" />返回
    //                     </Button>
    //                 </Col>
    //             </Row>
    //         </div>
    //     }`);
    // }

    initPageLifeCycle() {
        if (this.getEffect) {
            const { config, page } = this.form;
            const paramKey = config.paramKey || 'id';
            this.form.page.addDidMountStep(`if (this.state.${paramKey} > 0) {
                actions.${page.namespaceValue}.setReducers({
                    ${config.stateName}: {}
                });
                actions.${page.namespaceValue}.${this.getEffect.name}({
                    ${paramKey}: this.state.${paramKey}
                });
            }`);
        }
    }

    initStateVariableDeclaration() {
        this.form.page.addStateVariableDeclaration({
            key: 'id',
            value: 'this.props.id'
        });
    }

    initRenderVariableDeclaration() {
        const { page, config } = this.form;
        const { namespaceValue } = page;
        this.form.page.addRenderVariableDeclaration({
            name: 'form',
            source: `this.props`
        });
        this.form.page.addRenderVariableDeclaration({
            name: 'getFieldDecorator',
            source: 'this.props.form'
        });
        this.form.page.addRenderVariableDeclaration({
            name: config.stateName,
            source: `this.props.${namespaceValue}`
        });
        this.form.page.addRenderVariableDeclaration({
            name: 'modalVisible',
            source: `this.props.${namespaceValue}`
        });
    }

    initPropTypesCodes() {
        this.form.page.addPropTypesCodes(new Value({
            key: 'id',
            value: 'id',
            type: 'string'
        }));
    }

    toFormItemCode(item: FormItem) {
        debug(`modalForm: toFormItemCode ---- ${item.componentName}`);
        const { config } = this.form;
        const labelValue = item.config.label;

        const rules: Record<string, any>[] = [];
        if (item.componentName === 'Fragment') {
            return item.toCode();
        }

        if (item.config.isRequired) {
            rules.push({
                required: true,
                message: `'请输入${item.config.label}！'`
            });
        }
        let fieldConfigCode = item.getDecoratorConfigCode()
            .replace(/}$/, `\ninitialValue: ${config.stateName}.${item.config.key},\n}`);

        const rulesCodes = FormItem.getRulesCode(rules);
        if (rulesCodes) {
            fieldConfigCode = fieldConfigCode.replace(/}$/, `rules: [
                ${rulesCodes}
            ],\n}`);
        }

        /* 不需要formItem 则直接返回组件代码 */
        if (item.config.formItem === 'false') {
            return item.toCode();
        }

        return `<Form.Item
            label="${labelValue}"
            { ...MODAL_FORM_LAYOUT }
        >
            {
                getFieldDecorator('${item.config.key}',${fieldConfigCode})(
                    \n${item.toCode()}\n
                )
            }
        </Form.Item>`;
    }

    toCode() {
        const form = this.form;
        const componentsCode = form.components.map((item: FormItem) => {
            const tempItem: FormItem = item;
            tempItem.config.stateName = this.form.config.stateName;
            return this.toFormItemCode(tempItem);
        });
        return `<Modal
            title={'${form.page.pageChineseName}'}
            visible={modalVisible}
            onCancel={this.handleCancel}
            onOk={this.handleSubmit}
        >
            <Form>
                ${componentsCode.join('\n')}
            </Form>
        </Modal>`;
    }
}
