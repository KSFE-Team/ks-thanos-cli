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
    paramKey: string;
}


/**
 * 区域块组件
 */
export class Fragment extends Component {

    config: FragmentComponentConfig;
    components: FormItem[] = [];

    constructor(page: Page, config: FragmentComponentConfig) {
        super(page, config);

        this.componentName = 'Framgent';
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
        // debug(JSON.stringify(item));
        debug('Fragment: toFormItemCode');
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
        const componentsCode = this.components.map(this.toFormItemCode);
        return `<Fragment>
        ${componentsCode.join('\n')}
    </Fragment>`;
    }
}
