import Page from 'Src/factories/page';
import path from 'path';
import fsExtra, { writeJSON } from 'fs-extra';
import { FormItemConfig, FormItem } from '../formItem';
import { getPropStr } from 'Src/utils/getPropValue';
import { spawnSync } from 'child_process';

/**
 * Input组件
 */
export default class KMSCloudComponent extends FormItem {

    config: FormItemConfig

    packageName: string

    constructor(page: Page, config: FormItemConfig) {
        super(page, config);
        this.componentName = config.componentName;
        this.packageName = `@ks/kms-${this.componentName.toLowerCase()}`;
        this.config = config;
        this.install();
        this.registerComponent();
        this.updateCloudModel();
    }

    install() {
        spawnSync(
            `npx`,
            [
                'ks',
                'install',
                this.packageName
            ]
        );
    }

    /* 更新以来redux */
    async updateCloudModel() {
        const cloudModelPath = path.join(process.cwd(), 'src/defaultModel.json');
        const cloudModelJSON = await fsExtra.readJSONSync(cloudModelPath);
        cloudModelJSON[`${this.componentName}`] = `components/${this.packageName}/src/model`;
        await writeJSON(cloudModelPath, cloudModelJSON);
    }

    /* 注册组件 */
    registerComponent = async() => {
        const registerPath = path.join(process.cwd(), 'src/register.json');
        const registerJSON = await fsExtra.readJSONSync(registerPath) || {};
        registerJSON[`${this.componentName}`] = `components/${this.packageName}/src/index`;
        await writeJSON(registerPath, registerJSON);
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
