import { Component, ComponentConfig } from 'Src/factories/component/basic';
import { FormItem, FormItemConfig } from 'Src/factories/component/formItem';
import Page from 'Src/factories/page';

/**
 * 表单组件配置
 */
export interface KSWhiteCardComponentConfig extends ComponentConfig {
    components: FormItemConfig[]; // 子组件
    props: {
        title: string,
    };
}

/**
 * ksWhiteCard 组件
 */
export class KSWhiteCard extends Component {

    config: KSWhiteCardComponentConfig;
    components: FormItem[] = [];

    constructor(page: Page, config: KSWhiteCardComponentConfig) {
        super(page, config);

        this.componentName = 'KSWhiteCard';
        this.config = config;
    }

    getImports() {
        let imports = super.getImports();
        imports = imports.concat([
            {
                source: 'ks-cms-ui',
                name: 'KSWhiteCard',
                defaultImport: false
            }
        ]);
        return imports;
    }
    toFormItemCode(item: FormItem) {
        return `${item.toCode()}`;
    }

    initPageState() {
        const pageModel = this.page.model;
        pageModel.addInitialState(this.stateName, '');
    }

    toCode(item?: any) {
        const { props } = this.config;
        const components = item ? item.components : this.components;
        const componentsCode: any[] = components.map((item: any) => {
            if (item.componentName === 'Col') {
                return this.toCode(item);
            }
            let formItemCode = this.toFormItemCode(item);
            return formItemCode;
        });
        return `<KSWhiteCard title="${props.title}">
        ${componentsCode.join('\n')}
        </KSWhiteCard>`;
    }
}
