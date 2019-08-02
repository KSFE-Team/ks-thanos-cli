"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PageStructure {
    constructor(name) {
        this.name = '';
        this.pageName = '';
        this.pageClassName = '';
        this.imports = {
            'react': [{
                    name: 'React',
                    defaultImport: true
                }],
            'kredux': [{
                    name: 'connect',
                    defaultImport: false
                }]
        };
        this.decorators = [];
        this.components = [];
        this.name = name;
        this.pageName = name + 'Page';
        this.pageClassName = name.slice(0, 1).toUpperCase() + name.slice(1);
    }
    addImports(basicImport) {
        const { source } = basicImport;
        const existedImport = this.imports[source];
        const importModule = {
            name: basicImport.name,
            defaultImport: basicImport.defaultImport
        };
        if (existedImport) {
            existedImport.push(importModule);
        }
        else {
            this.imports[source] = [importModule];
        }
    }
    getImports() {
        return this.imports;
    }
    addDecorators(decorators = []) {
        this.decorators = this.decorators.concat(decorators);
    }
    getDecorators() {
        return this.decorators;
    }
    addComponents(components = []) {
        this.components = this.components.concat(components);
    }
    getComponents() {
        return this.components;
    }
}
exports.PageStructure = PageStructure;
//# sourceMappingURL=structure.js.map