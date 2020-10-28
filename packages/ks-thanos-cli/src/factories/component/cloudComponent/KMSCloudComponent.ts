import Page from 'Src/factories/page';
import path from 'path';
import fs from 'fs';
import { FormItemConfig, FormItem } from '../formItem';
import { spawnSync } from 'child_process';
import { changeConfig } from './changeConfig';
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

    /* 注册组件 */
    registerComponent = async () => {
        const registerPath = path.join(process.cwd(), 'src/default.js');
        const defaultConfig = fs.readFileSync(registerPath, { encoding: 'utf-8' });
        const insertData = `Src/components/@ks/kms-condition/src/model`; // 暂时写死
        // console.log('defaultConfig', defaultConfig);
        let handleConfig = changeConfig(defaultConfig, insertData);
        console.log('handleConfig', handleConfig);
        // registerJSON[`${this.componentName}`] = `Src/components/${this.packageName}/src/index`;
        // await writeJSON(registerPath, registerJSON);
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

    toCode() { return '' }
}
