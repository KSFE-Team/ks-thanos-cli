import Debug from './debugger';
import { Import } from '../factories/page/types';
import { FileImport } from './types/basic';

const debug = Debug(__filename);

export function getImportsCode(imports: Import[]) {
    const pageImports: FileImport = {};

    imports.forEach((importItem) => {
        const { source } = importItem;
        const existedImport = pageImports[source];
        const importModule = {
            name: importItem.name,
            defaultImport: importItem.defaultImport
        };
        if (existedImport) {
            existedImport.push(importModule);
        } else {
            pageImports[source] = [importModule];
        }
    });

    const codes: string[] = [];
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
