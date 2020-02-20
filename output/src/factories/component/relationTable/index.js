"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("../basic");
const createFile_1 = require("./file/createFile");
class RelationTable extends basic_1.Component {
    constructor(page, config) {
        super(page, config);
        this.components = [];
        this.childrenConfigs = [];
        this.componentName = 'relationTable';
        this.config = config;
        this.page.pageTitleCode = '';
        this.page.isUseCard = false;
        this.childrenConfigs = [
            {
                name: page.pageName,
                chineseName: config.components[1].listName || '',
                components: [config.components[0]],
                pagePath: page.pagePath,
                paramKey: page.paramKey,
                fileName: 'ParentForm',
                pageName: page.pageName,
                pageComponents: config.components,
                pageConfig: {
                    components: [config.components[0]],
                    paramKey: page.paramKey,
                }
            },
            {
                name: page.pageName,
                chineseName: config.components[1].listName || '',
                components: [config.components[1]],
                pagePath: page.pagePath,
                paramKey: page.paramKey,
                fileName: 'ParentTable',
                pageName: page.pageName,
                pageComponents: config.components,
                pageConfig: {
                    components: [config.components[1]],
                    paramKey: page.paramKey,
                }
            },
            {
                name: page.pageName,
                chineseName: config.components[3].listName || '',
                components: [config.components[2]],
                pagePath: page.pagePath,
                paramKey: page.paramKey,
                fileName: 'ChildForm',
                pageName: page.pageName,
                pageComponents: config.components,
                pageConfig: {
                    components: [config.components[2]],
                    paramKey: page.paramKey,
                }
            },
            {
                name: page.pageName,
                chineseName: config.components[3].listName || '',
                components: [config.components[3]],
                pagePath: page.pagePath,
                paramKey: page.paramKey,
                fileName: 'ChildTable',
                pageName: page.pageName,
                pageComponents: config.components,
                pageConfig: {
                    components: [{
                            ...config.components[3],
                            parentTableStageName: config.components[1].stateName
                        }],
                    paramKey: page.paramKey,
                }
            }
        ];
    }
    initProps() {
    }
    initEffects() {
    }
    initPageState() {
    }
    initPageLifecycle() {
    }
    initPageDecorators() {
    }
    getImports() {
        let imports = super.getImports();
        imports = imports
            .filter((item) => item.name !== 'Table')
            .concat([
            {
                source: 'ks-cms-ui',
                name: 'KSColumnLayout',
                defaultImport: false
            },
            {
                source: './components/ParentForm',
                name: 'ParentForm',
                defaultImport: true
            },
            {
                source: './components/ParentTable',
                name: 'ParentTable',
                defaultImport: true
            },
            {
                source: './components/ChildForm',
                name: 'ChildForm',
                defaultImport: true
            },
            {
                source: './components/ChildTable',
                name: 'ChildTable',
                defaultImport: true
            },
        ]);
        return imports;
    }
    toCode(item) {
        this.childrenConfigs.forEach(async (config) => {
            await createFile_1.createFile({
                ...config,
                page: this.page
            });
        });
        return `<KSColumnLayout
                upTitle={
                    <div style={{ margin: '-6px 0' }}>
                        <ParentForm/>
                    </div>
                }
                upNode={<ParentTable/>}
                downTitle={
                    <div style={{ margin: '-6px 0' }}>
                        <ChildForm/>
                    </ div>
                }
                downNode={<ChildTable/>}
            />`;
    }
}
exports.RelationTable = RelationTable;
//# sourceMappingURL=index.js.map