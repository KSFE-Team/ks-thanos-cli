import Page from 'Src/factories/page';
// import path from 'path';
// import fs from 'fs';
// import fsExtra, { writeJSON } from 'fs-extra';
import { FormItemConfig, FormItem } from '../formItem';
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
        // this.registerComponent();
        // this.updateCloudModel();
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

    // /* 更新以来redux */
    // async updateCloudModel() {
    //     console.log('updateCloudModel');
    //     console.log('process.cwd()', process.cwd());
    //     const cloudModelPath = path.join(process.cwd(), 'src/default.json');
    //     console.log('cloudModelPath', cloudModelPath);
    //     const cloudModelJSON = await fsExtra.readJSONSync(cloudModelPath);
    //     console.log('cloudModelJSON', cloudModelJSON);
    //     cloudModelJSON[`${this.componentName}`] = `components/${this.packageName}/src/model`;
    //     await writeJSON(cloudModelPath, cloudModelJSON);
    // }

    /* 注册组件 */
    // registerComponent = async () => {
    //     console.log('registerComponent');
    //     const registerPath = path.join(process.cwd(), 'src/default.js');
    //     console.log('registerPath', registerPath);
    //     const registerJSON = await fsExtra.readJSONSync(registerPath) || {};
    //     const config = fs.readFileSync('/Users/m/Desktop/project/CMS/ks-pcweb-cms-pangu/src/default.js', { encoding: 'utf-8' });
    //     console.log('config', config);
    //     console.log('registerJSON', registerJSON);
    //     registerJSON[`${this.componentName}`] = `Src/components/${this.packageName}/src/index`;
    //     await writeJSON(registerPath, registerJSON);
    // }

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

    toCode() { return '' }
}
