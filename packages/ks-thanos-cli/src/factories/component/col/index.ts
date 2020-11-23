// import {getPropValue} from 'Src/utils/getPropValue';
import {Component, ComponentConfig} from 'Src/factories/component/basic';
import {FormItem, FormItemConfig} from 'Src/factories/component/formItem';
import Page from 'Src/factories/page';
import Debug from 'Src/utils/debugger';
import { getPropStr } from 'Src/utils/getPropValue';
const debug = Debug(__filename);

/**
 * 表单组件配置
 */
export interface ColComponentConfig extends ComponentConfig {
    span: number
    components: FormItemConfig[]; // 子组件
}


/**
 * Col组件
 */
export class Col extends Component {

    config: ColComponentConfig;
    components: FormItem[] = [];

    constructor(page: Page, config: ColComponentConfig) {
        super(page, config);

        this.componentName = 'Col';
        this.config = config;
    }

    getDecoratorConfigCode = () => '{}'

    getImports() {
        let imports = super.getImports();
        imports = imports.concat([
            {
                source: 'antd',
                name: 'Col',
                defaultImport: false
            }
        ]);
        return imports;
    }

    getProps = (data: any) => {
        const propsCode = [];
        for (let propKey in data) {
            propsCode.push(getPropStr(propKey, data[propKey]));
        };
        return propsCode.join('\n');
    }

    initPageState() {
        const pageModel = this.page.model;
        pageModel.addInitialState(this.stateName, '');
    }

    toFormItemCode(item: FormItem) {
        debug(`Col: toFormItemCode  ======  ${item.componentName}`);
        return `${item.toCode()}`;
    }

    toCode(item?: any) {
        debug(`Col: ${this.components}`);
        const components = item ? item.components : this.components;
        const componentsCode: any[] = components.map((item: any) => {
            if (item.componentName === 'Col') {
                return this.toCode(item);
            }
            let formItemCode = this.toFormItemCode(item);
            return formItemCode;
        });
        return `<Col
                    ${this.getProps(this.config.props)}
                >
                    ${componentsCode.join('\n')}
                </Col>
        `;
    }
}
