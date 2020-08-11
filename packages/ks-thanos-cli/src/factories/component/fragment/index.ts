import {getPropValue} from 'Src/utils/getPropValue';
import {Component, ComponentConfig} from 'Src/factories/component/basic';
import {FormItem, FormItemConfig} from 'Src/factories/component/formItem';
import Page from 'Src/factories/page';
import Debug from 'Src/utils/debugger';

const debug = Debug(__filename);

/**
 * 表单组件配置
 */
export interface FragmentComponentConfig extends ComponentConfig {
    components: FormItemConfig[]; // 子组件
    showKey: string;
    showValue: any;
}


/**
 * 区域块组件
 */
export class Fragment extends Component {

    config: FragmentComponentConfig;
    components: FormItem[] = [];

    constructor(page: Page, config: FragmentComponentConfig) {
        super(page, config);

        this.componentName = 'Fragment';
        this.config = config;
    }

    getImports() {
        let imports = super.getImports();
        imports = imports.concat([
            {
                source: 'react',
                name: 'Fragment',
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
        debug(`Fragment: toFormItemCode  ======  ${item.componentName}`);
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

    toCode(item?: any) {
        const components = item ? item.components : this.components;
        const componentsCode: any[] = components.map((item: any) => {
            if (item.componentName === 'Fragment') {
                return this.toCode(item);
            }
            let formItemCode = this.toFormItemCode(item);
            return formItemCode;
        });
        const showKey = (item || this).config.showKey;
        const showValue = getPropValue((item || this).config.showValue);
        return `
            {
                this.props.form.getFieldValue('${showKey}') === ${showValue} && <Fragment>
                    ${componentsCode.join('\n')}
                </Fragment>
            }
        `;
    }
}
