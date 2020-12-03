import KMSCloudComponent from '../KMSCloudComponent';
import { FormItemConfig } from '../../formItem/index';
import Page from 'Src/factories/page';

/**
 * Conditions组件
 */
interface ConditionsConfig  extends FormItemConfig{
    formfields: string[];
}
export default class Conditions extends KMSCloudComponent{

    config: ConditionsConfig;// 组件配置

    constructor(page: Page, config: ConditionsConfig) {
        super(page, config);
        this.config = config;
    }
    getDecoratorConfigCode() {
        return '{}';
    }

    toCode() {
        const formfields=JSON.stringify(this.config.formfields);
        return `<${this.componentName}
        data={{}}
        form={this.props.form}
        formFields={${formfields}}
    />
`;
    }
}
