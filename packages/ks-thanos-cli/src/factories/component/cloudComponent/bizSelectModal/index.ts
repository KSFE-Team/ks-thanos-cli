import Page from 'Src/factories/page';
import { FormItemConfig } from '../../formItem';
import { getPropStr } from 'Src/utils/getPropValue';
import KMSCloudComponent from '../KMSCloudComponent';

/**
 * Input组件
 */
export default class BizSelectModal extends KMSCloudComponent {

    config: FormItemConfig

    packageName: string

    constructor(page: Page, config: FormItemConfig) {
        super(page, config);
        this.componentName = config.componentName;
        this.packageName = `@ks/kms-${this.componentName.toLowerCase()}`;
        this.config = config;
    }

    getDecoratorConfigCode() {
        return '{}';
    }

    getImports() {
        let imports = [
            {
                source: `Src/components/${this.packageName}`,
                name: this.componentName,
                defaultImport: this.config.default
            }
        ];
        return imports;
    }

    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            propsCode.push(getPropStr(propKey, this.props[propKey]));
        }
        return `<${this.componentName}
        ${propsCode.join('\n')}
    />`;
    }
}
