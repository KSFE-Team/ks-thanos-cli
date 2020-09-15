import { Component } from '../basic';
import Page from 'Src/factories/page';
import { createFile } from './file/createFile';


/**
 * table组件
 */
export class RelationTable extends Component {

    components: any[] = [];

    upForm: any;

    upTable: any;

    downForm: any;

    downTable: any;

    childrenConfigs: any[] = [];

    constructor(page: Page, config: any) {
        super(page, config);
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
        // this.page.addDidMountStep(`this.${this.effect.name}();`);
    }

    initPageDecorators() {
        // const { pageName } = this.page;
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
                    source: './materials/ParentForm',
                    name: 'ParentForm',
                    defaultImport: true
                },
                {
                    source: './materials/ParentTable',
                    name: 'ParentTable',
                    defaultImport: true
                },
                {
                    source: './materials/ChildForm',
                    name: 'ChildForm',
                    defaultImport: true
                },
                {
                    source: './materials/ChildTable',
                    name: 'ChildTable',
                    defaultImport: true
                },
            ]);
        return imports;
    }

    toCode() {
        this.childrenConfigs.forEach(async(config) => {
            await createFile({
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
