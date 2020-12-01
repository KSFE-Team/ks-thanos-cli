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
                    form.page.pageName,
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
        const imports = [
            {
                source: 'ks-cms-ui',
                name: 'KSSearchForm',
                defaultImport: false
            }, {
                source: 'ks-cms-utils',
                name: 'goto',
                defaultImport: false
            }, {
                source: 'antd',
                name: 'Button',
                defaultImport: false
            }
        ];
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

    // initPageLifeCycle() {
    //     const { page } = this.form;
    //     this.form.page.addDidMountStep(`actions.${page.pageName}.setReducers(STATE);`);
    // }

    initPageMethods() {
        const form = this.form;
        if (this.listEffect) {
            const pageModel = form.page.model;
            form.page.addMethod(`
                ${form.stateName}Reset = () => {
                    actions.${pageModel.namespace}.setReducers({
                        ${form.stateName}: {
                            ...this.props.${pageModel.namespace}.${form.stateName},
                            page: 1
                        }
                    });
                    this.${this.listEffect.name}();
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
        return `<KSSearchForm
        form={this.props.form}
        components={[
            ${form.components.map(this.toFormItemCode).join(',\n')}
        ]}
        actions={<React.Fragment>
            <Button
                className="mar-l-4"
                onClick={() => {
                    this.${form.stateName}Reset();
                }}
            >查询</Button>
            <Button
                type="primary"
                className="mar-l-4"
                onClick={() => {
                    goto.push('');
                }}
            >新增</Button>
        </React.Fragment>}
    />`;
    }
}
