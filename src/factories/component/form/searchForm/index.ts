import { FormItem } from '../../formItem';
import { FormDelegate } from '../formDelegate/index';

export class SearchFormDelegate extends FormDelegate {
    getImports() {
        const imports = [{
            source: 'ks-cms-ui',
            name: 'KSSearchForm',
            defaultImport: false
        }];
        return imports;
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
                actions={<Fragment>
                    <Button
                        onClick={() => {
                            this.${form.stateName}Reset();
                        }}
                        className='mar-l-4'
                    >查询</Button>
                    </Fragment>}
            />
        </Form>`;
    }
}
