import { getPropStr } from 'Src/utils/getPropValue';
import KMSCloudComponent from '../KMSCloudComponent';

/**
 * Input组件
 */
export default class BizSelectModal extends KMSCloudComponent {

    getDecoratorConfigCode() {
        return '{}';
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
