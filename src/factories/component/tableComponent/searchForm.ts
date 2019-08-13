import { BasicComponent } from '../basicComponent/index';
import Page from '../../page/page';
import { FormComponentConfig } from '../types';
import { FormItem } from '../formComponent/formItem';
import { TableComponent } from './index';
import { FormDecoratorConfig } from '../../decorator/types';
import { FormDecorator } from '../../decorator/form';

export class SearchFormComponent extends BasicComponent {

    formItmes: FormItem[] = []
    table: TableComponent
    stateName: string
    loadEffectName: string

    constructor(page: Page, config: FormComponentConfig, table: TableComponent) {
        super(page, config);
        this.formItmes = config.formItems.map((item) => new FormItem(item));
        this.table = table;
        this.stateName = this.table.stateName;
        this.loadEffectName = `load${this.table.className}List`;
    }

    initPageMethods() {
        const pageName = this.page.pageName;

        this.page.addMethod(`
            ${this.stateName}Reset() {
                actions.${pageName}.setReducers({
                    ${this.stateName}: {
                        ...this.props.${this.stateName},
                        page: 1
                    }
                });
                this.${this.loadEffectName}();
            }
        `);
    }

    initPageDecorators() {
        const decoratorConfig: FormDecoratorConfig = {
            name: 'Form.create',
            pageName: this.page.pageName,
            stateName: this.stateName,
            formItems: this.formItmes.map((item) => item.config.key)
        };
        const decorator = new FormDecorator(decoratorConfig);
        this.page.addDecorator(decorator);
    }

    toCode() {
        const formItemsCode = this.formItmes.map((item) => `<Col span={3}>
                ${item.toCode()}
            </Col>`);

        const colCount = formItemsCode.length;
        const stateName = this.table.componentName;

        return `<Form>
                    <Row>
                        ${formItemsCode} 
                        <Col span={${24 - colCount}}>
                            <Button
                                onClick={() => {
                                    this.${stateName}Reset();
                                }}
                            >查询</Button>
                        </Col>    
                    </Row>
                </Form>`;
    }
}
