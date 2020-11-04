import KMSCloudComponent from '../KMSCloudComponent';

/**
 * BizSelectTypeContent组件
 */
export default class BizSelectTypeContent extends KMSCloudComponent {

    getDecoratorConfigCode() {
        return '{}';
    }

    toCode() {
        let propsCode: String[] = [];
        for (let propKey in this.props) {
            propsCode.push(`${propKey}={${this.props[propKey]}}`);
        }
        return `<${this.componentName}
            ${propsCode.join('\n')}
        />`;
    }
}
