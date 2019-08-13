import { Import, ComponentStateProps } from './types';
import { ComponentConfig, Basic, TableComponentConfig } from '../component/types';
import Debug from '../../utils/debugger';
import { TableComponent } from '../component/tableComponent';
import { BasicComponent } from '../component/basicComponent';
import { COMPONENT_TYPES } from '../../utils/constants/component';
import Page from './page';

const debug = Debug(__filename);

export function getImportsCode(imports: Import) {
    const codes: string[] = [];
    for (let source in imports) {
        const modules = imports[source];
        const defaultImportModules = modules.filter(({ defaultImport }) => defaultImport).map(({ name }) => name);
        const importModules = modules.filter(({ defaultImport }) => !defaultImport).map(({ name }) => name);
        const defaultImportModulesCode = defaultImportModules.join();
        const importModulesCode = importModules.join(', ');
        debug(`defaultImportModules code: ${defaultImportModulesCode}`);
        debug(`importModules code: ${importModulesCode}`);
        codes.push(`import ${defaultImportModulesCode}${defaultImportModules.length && importModules.length ? ', ' : ''}${importModules.length ? `{ ${importModulesCode} }` : ''} from '${source}'`);
    }
    debug(`Import Code: ${codes}`);
    return codes.join('\n');
}

export function getComponentsCode(components: BasicComponent[]) {
    return components.map((component) => {
        return component.toCode();
    }).join('\n');
}

export function getStateCode(stateProps: ComponentStateProps[]) {
    return stateProps.map(({ name, value }) => {
        const valueStr = JSON.stringify(value);
        debug(`state ${name}: ${valueStr}`);
        return `${name}: ${valueStr}`;
    }).join('\n');
}

export function addComponent(
    page: Page,
    instance: Basic,
    component: ComponentConfig,
    handler?: (component: ComponentConfig, componentInstance: BasicComponent) => void
) {
    let componentInstance: BasicComponent | undefined;
    switch (component.name) {
        case COMPONENT_TYPES.TABLE:
            componentInstance = new TableComponent(page, component as TableComponentConfig);
            componentInstance.init();
            instance.addComponent(componentInstance);
            break;
    }
    if (componentInstance) {
        handler && handler(component, componentInstance);
        if (component.components) {
            component.components.forEach((component) => {
                addComponent(page, componentInstance as BasicComponent, component, handler);
            });
        }
    }
}
