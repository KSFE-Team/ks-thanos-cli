// import {getPropValue} from 'Src/utils/getPropValue';
import {Component, ComponentConfig} from 'Src/factories/component/basic';
import {FormItem, FormItemConfig} from 'Src/factories/component/formItem';
import Page from 'Src/factories/page';
import Debug from 'Src/utils/debugger';

const debug = Debug(__filename);

/**
 * 表单组件配置
 */
export interface ExtendContainerComponentConfig extends ComponentConfig {
    label: string
    key: string
    sortKey: string
    addButtonText: string
    components: FormItemConfig[]; // 子组件
}


/**
 * 区域块组件
 */
export class ExtendContainer extends Component {

    config: ExtendContainerComponentConfig;
    components: FormItem[] = [];

    constructor(page: Page, config: ExtendContainerComponentConfig) {
        super(page, config);

        this.componentName = 'KSExtendContainer';
        this.config = config;
    }

    getDecoratorConfigCode = () => '{}'

    getImports() {
        let imports = super.getImports();
        imports = imports.concat([
            {
                source: 'ks-cms-ui',
                name: 'KSExtendContainer',
                defaultImport: false
            }
        ]);
        return imports;
    }

    initPageState() {
        const pageModel = this.page.model;
        pageModel.addInitialState(this.stateName, '');
    }

    toFormItemCode(item: FormItem) {
        const labelValue = item.config.label;
        const keyValue = item.config.key;
        
        return `{
            label: '${labelValue}',
            key: '${keyValue}',
            rules: [
                { required: true, message: '${labelValue}不能为空'}
            ],
            component: ${item.toCode()}
        },`;
    }

    toCode(item?: any) {
        debug(`KSExtendContainer: ${this.components}`);
        const components = item ? item.components : this.components;
        const componentsCode: any[] = components.map((item: any) => {
            let formItemCode = this.toFormItemCode(item);
            return formItemCode;
        });
        return `<Form.Item
                    label='${this.config.label}'
                    { ...FORM_LAYOUT }
                >
                    <KSExtendContainer
                        form={this.props.form}
                        formKey='${this.config.key}'
                        sortKey='${this.config.sortKey}'
                        initialValue={[]}
                        addButtonText='${this.config.addButtonText}'
                        components={[
                            ${componentsCode.join('\n')}
                        ]}
                    />
                </Form.Item>
        `;
    }
}
