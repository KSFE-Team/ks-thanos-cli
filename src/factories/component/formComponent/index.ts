import { BasicComponent } from '../basicComponent/index';
import { FormDecoratorConfig } from '../../decorator/types';
import { FormItem } from './formItem';
import { FormDecorator } from '../../decorator/form';
import { FormComponentConfig } from '../types';
import Page from '../../page';
import { DataDependence } from '../../request/index';

export class FormComponent extends BasicComponent {

    config: FormComponentConfig
    dataDependencies: DataDependence | undefined

    constructor(page: Page, config: FormComponentConfig) {
        super(page, config);
        this.config = config;

        const activeEvent = this.config.activeEvent;
        const activeEventType = activeEvent.eventType;

        if (activeEventType === 'api') {
            this.dataDependencies = new DataDependence(this.stateName, page.model, config.activeEvent.dependencies);
        }
    }

    getImports() {
        const imports = super.getImports();
        imports.push({
            source: 'antd',
            name: 'Row',
            defaultImport: false
        });
        imports.push({
            source: 'antd',
            name: 'Col',
            defaultImport: false
        });
        return imports;
    }

    initEffects() {
        const pageModel = this.page.model;
        if (this.dataDependencies) {
            if (!pageModel.getEffect(this.dataDependencies.effect.name)) {
                pageModel.addEffect(this.dataDependencies.effect);
            }
        }
    }

    initPageMethods() {
        if (this.dataDependencies && this.dataDependencies.responseType === 'list') {
            const pageModel = this.page.model;
            this.page.addMethod(`
                ${this.stateName}Reset() {
                    actions.${pageModel.namespace}.setReducers({
                        ${this.stateName}: {
                            ...this.props.${this.stateName},
                            page: 1
                        }
                    });
                    this.${this.dataDependencies.effect.name}();
                }
            `);
        }
    }

    initPageDecorators() {
        const decoratorConfig: FormDecoratorConfig = {
            name: 'Form.create',
            pageName: this.page.pageName,
            stateName: this.stateName,
            formItems: this.components.map((item) => (item as FormItem).config.key)
        };
        const decorator = new FormDecorator(decoratorConfig);
        this.page.addDecorator(decorator);
    }

    toCode() {
        const componentsCode = this.components.map((item) => `<Col span={3}>
            ${item.toCode()}
        </Col>`);
        return `<${this.componentName}>
            <Row>
                ${componentsCode}
            </Row>
        </${this.componentName}>`;
    }
}