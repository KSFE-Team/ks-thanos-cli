import { getPropStr } from 'Src/utils/getPropValue';
import KMSCloudComponent from '../KMSCloudComponent';

/**
 * bizTimingSetting组件
 */
export default class BizTimingSetting extends KMSCloudComponent {

    getDecoratorConfigCode() {
        return '{}';
    }

    toCode() {
        let propsCode: String[] = [];
        for (let propKey in this.props) {
            if (propKey === 'formFields') {
                propsCode.push(`${propKey}={${this.props[propKey]}}`);
            } else {
                propsCode.push(getPropStr(propKey, this.props[propKey]));
            }
        }
        return `<${this.componentName}
            ${propsCode.join('\n')}
        />`;
    }
}
