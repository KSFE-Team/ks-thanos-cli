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
export interface RowComponentConfig extends ComponentConfig {
    type: string
    justify: string
    align: string
    components: FormItemConfig[]; // 子组件
}


/**
 * Row组件
 */
export class Row extends Component {

    config: RowComponentConfig;
    components: FormItem[] = [];

    constructor(page: Page, config: RowComponentConfig) {
        super(page, config);

        this.componentName = 'Row';
        this.config = config;
    }

    getDecoratorConfigCode = () => '{}'

    getImports() {
        let imports = super.getImports();
        imports = imports.concat([
            {
                source: 'antd',
                name: 'Row',
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
        debug(`Row: toFormItemCode  ======  ${item.componentName}`);
        return `${item.toCode()}`;
    }

    toCode(item?: any) {
        debug(`Row: ${this.components}`);
        const components = item ? item.components : this.components;
        const componentsCode: any[] = components.map((item: any) => {
            if (item.componentName === 'Row') {
                return this.toCode(item);
            }
            let formItemCode = this.toFormItemCode(item);
            return formItemCode;
        });
        const props = {
            type: this.config.type,
            justify: this.config.justify,
            align: this.config.align,
        }
        return `<Row
                    ${this.getProps(props)}
                >
                    ${componentsCode.join('\n')}
                </Row>
        `;
    }
}
