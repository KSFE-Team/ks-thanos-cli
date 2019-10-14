import { FormItem } from '../../formItem';
import { FormDelegate } from '../formDelegate/index';
import { Effect } from 'Src/factories/model/effect';
import { Form } from '../index';
import { EffectManager } from 'Src/factories/model/effect/manager';
import Debug from 'Src/utils/debugger';

const debug = Debug(__filename);

export class SearchFormDelegate extends FormDelegate {

    listEffect: Effect | undefined

    constructor(form: Form) {
        super(form);

        const activeEvents = form.config.activeEvents || [];

        activeEvents.forEach((activeEvent) => {
            const activeEventType = activeEvent.eventType;
            debug(`NormalForm activeEvent: ${JSON.stringify(activeEvent)}`);
            if (activeEventType === 'request') {
                debug('生成 listEffect');
                this.listEffect = EffectManager.create(
                    form.stateName,
                    form.page.model,
                    activeEvent.dependencies
                );
            }
        });
        if (!this.listEffect) {
            debug('SearchForm 缺少 listEffect');
        }
    }

    getImports() {
        const imports = [{
            source: 'ks-cms-ui',
            name: 'KSSearchForm',
            defaultImport: false
        }, {
            source: 'ks-cms-utils',
            name: 'goto',
            defaultImport: false
        }];
        return imports;
    }

    initEffects() {
        const pageModel = this.form.page.model;
        if (this.listEffect) {
            if (!pageModel.getEffect(this.listEffect.name)) {
                pageModel.addEffect(this.listEffect);
            }
        }
    }

    initPageMethods() {
        const form = this.form;
        if (form.effect && form.effect.responseType === 'list') {
            const pageModel = form.page.model;
            form.page.addMethod(`
                ${form.stateName}Reset() {
                    actions.${pageModel.namespace}.setReducers({
                        ${form.stateName}: {
                            ...this.props.${pageModel.namespace}.${form.stateName},
                            page: 1
                        }
                    });
                    this.${form.effect.name}();
                }
            `);
        }
    }

    toFormItemCode(item: FormItem) {
        return `{
            key: '${item.config.key}',
            title: '${item.config.label}',
            component: ${item.toCode()}
        }`;
    }

    toCode() {
        const form = this.form;
        return `<Form>
            <KSSearchForm
                form={this.props.form}
                components={[
                    ${form.components.map(this.toFormItemCode).join(',\n')}
                ]}
                actions={<React.Fragment>
                    <Button
                        type="primary"
                        className="mar-l-4"
                        onClick={() => {
                            this.${form.stateName}Reset();
                        }}
                    >查询</Button>
                    <Button
                        type="primary"
                        className="mar-l-4"
                        onClick={() => {
                            // TODO: 跳转新增页面
                            goto.go('');
                        }}
                    >新增</Button>
                    </React.Fragment>}
            />
        </Form>`;
    }
}
