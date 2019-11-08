import Page from 'Src/factories/page';
import path from 'path';
import fsExtra, { writeJSON } from 'fs-extra';
import { FormItemConfig, FormItem } from '../formItem';
import { getPropValue } from 'Src/utils/getPropValue';
import { spawnSync } from 'child_process';

/**
 * Input组件
 */
export class KMSCloudComponent extends FormItem {

    config: FormItemConfig

    packageName: string

    constructor(page: Page, config: FormItemConfig) {
        super(page, config);
        this.componentName = config.componentName;
        this.packageName = `@ks/kms-${this.componentName.toLowerCase()}`;
        this.config = config;
        this.install();
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

    async updateCloudModel() {
        const cloudModelPath = path.join(process.cwd(), 'src/cloudModel.json');
        const cloudModelJSON = await fsExtra.readJSONSync(cloudModelPath);
        cloudModelJSON[`${this.componentName}`] = `Src/Components/${this.packageName}/src/model`
        await writeJSON(cloudModelPath, cloudModelJSON);
    }

    getDecoratorConfigCode() {
        return '{}';
    }

    getImports() {
        let imports = [
            {
                source: `Src/Components/${this.packageName}`,
                name: this.componentName,
                defaultImport: this.config.default
            }
        ];
        return imports;
    }

    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            const propValue = getPropValue(this.props[propKey]);
            propsCode.push(
                `${propKey}={${propValue}}`
            );
        }
        return `<${this.componentName}
        ${propsCode}
    />`;
    }
}
