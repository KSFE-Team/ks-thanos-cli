"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../basic/index");
const form_1 = require("Src/factories/decorator/form");
const index_2 = require("./searchForm/index");
const normalForm_1 = require("Src/factories/component/form/normalForm");
class Form extends index_1.Component {
    constructor(page, config) {
        super(page, config);
        this.components = [];
        this.config = config;
        if (this.config.type === 'search') {
            this.delegate = new index_2.SearchFormDelegate(this);
        }
        else {
            this.delegate = new normalForm_1.NormalFormDelegate(this);
        }
    }
    getImports() {
        let imports = super.getImports();
        imports = imports.concat([
            {
                source: 'kredux',
                name: 'actions',
                defaultImport: false
            },
            {
                source: 'antd',
                name: 'Button',
                defaultImport: false
            },
            ...this.delegate.getImports()
        ]);
        return imports;
    }
    initEffects() {
        this.delegate.initEffects && this.delegate.initEffects();
    }
    initPageMethods() {
        this.delegate.initPageMethods && this.delegate.initPageMethods();
    }
    initPageState() {
        this.delegate.initPageState && this.delegate.initPageState();
    }
    initPageDecorators() {
        const decoratorConfig = {
            name: 'Form.create',
            type: this.config.type,
            pageName: this.page.pageName,
            stateName: this.stateName,
            formItems: this.components.map((item) => item.config.key)
        };
        const decorator = new form_1.FormDecorator(decoratorConfig);
        this.page.addDecorator(decorator);
        this.delegate.initPageDecorators && this.delegate.initPageDecorators();
    }
    initPageTitle() {
        this.delegate.initPageTitle && this.delegate.initPageTitle();
    }
    initPageLifecycle() {
        this.delegate.initPageLifeCycle && this.delegate.initPageLifeCycle();
    }
    toCode() {
        return this.delegate.toCode();
    }
}
exports.Form = Form;
//# sourceMappingURL=index.js.map