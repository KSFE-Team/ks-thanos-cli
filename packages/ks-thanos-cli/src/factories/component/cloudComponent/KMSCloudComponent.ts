import Page from 'Src/factories/page';
import path from 'path';
import fs from 'fs';
import { FormItemConfig, FormItem } from '../formItem';
import { spawnSync } from 'child_process';
import { changeConfig } from './changeConfig';
import { successText } from 'Src/utils/log';
import { formatFile } from 'Src/utils/format';
import { AstTransfer } from './../../astTransfer';
const code = `
import request from 'Src/utils/request';
import { actions } from 'kredux';
import { API } from 'Src/api';
export const STATE = { // 曾阿牛测试
    test: {
        name: '',
        page: 1,
        limit: 10,
        total: 0
    },
    list: []
};

export default {
    namespace: 'searchFormTest',

    initialState: { ...STATE },

    effects: {
        async loadSearchFormTestList(payload, getState) {
            try {
                const state = getState().searchFormTest.test;

                let postData = {
                    pageSize: state.limit,
                    pageNo: state.page,
                    name: state.name && state.name.value
                };

                const response = await request(API.searchFormTest.query, {
                    method: 'get',
                    body: postData
                });

                if (response && response.code === 0) {
                    actions.searchFormTest.setReducers({
                        test: {
                            ...state,
                            total: response.data.totalCount
                        },
                        list: response.data.list
                    });
                }
            } catch (error) {
                actions.login.commonError(error);
            }
        }
    }
};
`

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
        const astConfig = new AstTransfer(code);
        console.log('originData11', astConfig.originData);
        console.log('astData11', astConfig.astData);
        const insertData = `Src/components/@ks/kms-${this.componentName.toLowerCase()}/src/model`;
        let handleData = changeConfig(defaultConfig, insertData);
        fs.writeFile(registerPath, handleData, () => {
            console.log(successText(`default.js 更新成功！`));
            // eslint格式化文件
            formatFile(registerPath);
        });
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
