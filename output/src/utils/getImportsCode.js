"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugger_1 = __importDefault(require("./debugger"));
const debug = debugger_1.default(__filename);
function getImportsCode(imports) {
    const pageImports = {};
    imports.forEach((importItem) => {
        const { source } = importItem;
        const existedImport = pageImports[source];
        const importModule = {
            name: importItem.name,
            defaultImport: importItem.defaultImport
        };
        if (existedImport) {
            existedImport.push(importModule);
        }
        else {
            pageImports[source] = [importModule];
        }
    });
    const codes = [];
    Object.entries(pageImports).forEach((item) => {
        const [source, modules] = item;
        const defaultImportModules = modules.filter(({ defaultImport }) => defaultImport).map(({ name }) => name);
        const importModules = modules.filter(({ defaultImport }) => !defaultImport).map(({ name }) => name);
        const defaultImportModulesCode = defaultImportModules.join();
        const importModulesCode = importModules.join(', ');
        debug(`defaultImportModules code: ${defaultImportModulesCode}`);
        debug(`importModules code: ${importModulesCode}`);
        codes.push(`import ${defaultImportModulesCode}${defaultImportModules.length && importModules.length ? ', ' : ''}${importModules.length ? `{ ${importModulesCode} }` : ''} from '${source}'`);
    });
    debug(`Import Code: ${codes}`);
    return codes.join('\n');
}
exports.getImportsCode = getImportsCode;
//# sourceMappingURL=getImportsCode.js.map