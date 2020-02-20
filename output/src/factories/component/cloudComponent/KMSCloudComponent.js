"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importStar(require("fs-extra"));
const formItem_1 = require("../formItem");
const getPropValue_1 = require("Src/utils/getPropValue");
const child_process_1 = require("child_process");
class KMSCloudComponent extends formItem_1.FormItem {
    constructor(page, config) {
        super(page, config);
        this.registerComponent = async () => {
            const registerPath = path_1.default.join(process.cwd(), 'src/register.json');
            const registerJSON = await fs_extra_1.default.readJSONSync(registerPath) || {};
            registerJSON[`${this.componentName}`] = `components/${this.packageName}/src/index`;
            await fs_extra_1.writeJSON(registerPath, registerJSON);
        };
        this.componentName = config.componentName;
        this.packageName = `@ks/kms-${this.componentName.toLowerCase()}`;
        this.config = config;
        this.install();
        this.registerComponent();
        this.updateCloudModel();
    }
    install() {
        child_process_1.spawnSync(`npx`, [
            'ks',
            'install',
            this.packageName
        ]);
    }
    async updateCloudModel() {
        const cloudModelPath = path_1.default.join(process.cwd(), 'src/defaultModel.json');
        const cloudModelJSON = await fs_extra_1.default.readJSONSync(cloudModelPath);
        cloudModelJSON[`${this.componentName}`] = `components/${this.packageName}/src/model`;
        await fs_extra_1.writeJSON(cloudModelPath, cloudModelJSON);
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
            const propValue = getPropValue_1.getPropValue(this.props[propKey]);
            propsCode.push(`${propKey}={${propValue}}`);
        }
        return `<${this.componentName}
        ${propsCode.join('\n')}
    />`;
    }
}
exports.KMSCloudComponent = KMSCloudComponent;
//# sourceMappingURL=KMSCloudComponent.js.map