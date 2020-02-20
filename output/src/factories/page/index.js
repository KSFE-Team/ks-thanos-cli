"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugger_1 = __importDefault(require("Src/utils/debugger"));
const string_1 = require("Src/utils/string");
const model_1 = __importDefault(require("../model"));
const connect_1 = require("../decorator/connect");
const getImportsCode_1 = require("Src/utils/getImportsCode");
const basicElement_1 = require("Src/factories/basicElement");
const manager_1 = require("../component/manager");
const value_1 = require("Src/factories/value");
const debug = debugger_1.default(__filename);
class Page extends basicElement_1.BasicContainer {
    constructor({ name, chineseName, components = [], paramKey = '', pagePath = '' }) {
        super();
        this.pageName = '';
        this.pageChineseName = '';
        this.className = '';
        this.paramKey = '';
        this.pagePath = '';
        this.decorators = [];
        this.components = [];
        this.methods = [];
        this.didMountStep = [];
        this.pageTitleCode = '';
        this.isUseCard = true;
        this.getPageCard = (codes, titleCodes) => {
            if (this.isUseCard) {
                return `<KSWhiteCard
                ${titleCodes}
            >
                ${codes}
            </KSWhiteCard>`;
            }
            return codes;
        };
        this.pageName = string_1.lowerFirst(name);
        this.pageChineseName = chineseName;
        this.pageTitleCode = `title={'${this.pageChineseName}'}`;
        this.className = string_1.upperFirst(name);
        this.paramKey = paramKey;
        this.pagePath = pagePath;
        this.connectDecorator = new connect_1.ConnectDecorator({
            name: 'connect',
            pageName: this.pageName,
            inputProps: [
                this.pageName,
            ],
            outputProps: [
                new value_1.Value({
                    key: this.pageName,
                    value: this.pageName,
                    type: 'object'
                })
            ]
        });
        this.model = new model_1.default({
            initialState: {},
            namespace: this.pageName
        });
        this.decorators.push(this.connectDecorator);
        this.init(components);
    }
    init(config = []) {
        config.forEach((componentConfig) => {
            debug(`add component: ${JSON.stringify(componentConfig)}`);
            manager_1.ComponentManager.add(this, componentConfig);
        });
    }
    addDecorator(decorator) {
        this.decorators.push(decorator);
    }
    addComponent(component) {
        this.components.push(component);
    }
    addMethod(methodCode) {
        this.methods.push(methodCode);
    }
    addDidMountStep(stepCode) {
        this.didMountStep.push(stepCode);
    }
    updateConnectDecorator(inputProps, outputProps) {
        this.connectDecorator.updateInputProps(inputProps);
        this.connectDecorator.updateOutputProps(outputProps);
    }
    replaceConnectDecorator(inputProps, outputProps) {
        this.connectDecorator.replaceInputProps(inputProps);
        this.connectDecorator.replaceOutputProps(outputProps);
    }
    initPageTitleCode(code) {
        this.pageTitleCode = code;
    }
    getPropTypesCode() {
        const decoratorPropTypesCode = this.decorators
            .map((item) => item.getOutputPropTypesCode())
            .filter((code) => code);
        return [
            ...decoratorPropTypesCode,
            'match: PropTypes.object'
        ].join(',\n');
    }
    getImports() {
        let imports = [
            {
                name: 'React',
                source: 'react',
                defaultImport: true
            },
            {
                name: 'PropTypes',
                source: 'prop-types',
                defaultImport: true
            }
        ];
        if (this.isUseCard) {
            imports.push({
                source: 'ks-cms-ui',
                name: 'KSWhiteCard',
                defaultImport: false
            });
        }
        this.components.forEach((component) => {
            imports = imports.concat(component.getImports());
        });
        this.decorators.forEach((decorator) => {
            imports = imports.concat(decorator.getImports());
        });
        return imports;
    }
    toCode() {
        const importsCode = getImportsCode_1.getImportsCode(this.getImports());
        const componentsCode = this.components.map((item) => item.toCode()).join('\n');
        const decoratorCode = this.decorators.filter((item) => !(item instanceof connect_1.ConnectDecorator)).map((item) => item.toCode()).join('\n');
        const connectDecoratorCode = this.connectDecorator.toCode();
        const methodsCode = this.methods.join('\n');
        const didMountStepCode = this.didMountStep.join('\n');
        const propTypesCode = this.getPropTypesCode();
        return `
${importsCode}

${connectDecoratorCode}
${decoratorCode}
export default class ${this.className} extends React.Component {

    static propTypes = {
        ${propTypesCode}
    }
    ${methodsCode}
    componentDidMount() {
        ${didMountStepCode}
    }

    render() {
        return (
            ${this.getPageCard(componentsCode, this.pageTitleCode)}
        );
    }
}
`;
    }
}
exports.default = Page;
exports.getPage = () => Page;
//# sourceMappingURL=index.js.map