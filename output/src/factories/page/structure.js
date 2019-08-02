"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upperFirst_1 = require("../../utils/upperFirst");
class PageStructure {
    constructor(name) {
        this.name = '';
        this.pageName = '';
        this.className = '';
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
        this.stateProps = [];
        this.name = name;
        this.className = upperFirst_1.upperFirst(name);
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
        components.forEach((component) => {
            if (component.name === 'KSTable') {
                this.addDecorators([
                    {
                        name: 'connect',
                        inputProps: [
                            this.name,
                            `${this.name}ListLoading`
                        ]
                    }
                ]);
            }
        });
        this.components = this.components.concat(components);
    }
    getComponents() {
        return this.components;
    }
    addState(stateProps) {
        this.stateProps = this.stateProps.concat(stateProps);
    }
    getState() {
        return this.stateProps;
    }
}
exports.PageStructure = PageStructure;
//# sourceMappingURL=structure.js.map