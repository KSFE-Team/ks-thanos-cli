import Debug from './debugger';
import { Import, VariableDeclaration, VariableFromState } from '../factories/page/types';
import { FileImport } from './types/basic';
import { uniqueArray } from './array';

const debug = Debug(__filename);

/**
 * 生成 import 相关的 code
 * @param imports 文件中需要 import 的对象
 */
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
        const defaultImportModules = uniqueArray(modules.filter(({ defaultImport }) => defaultImport).map(({ name }) => name));
        const importModules = uniqueArray(modules.filter(({ defaultImport }) => !defaultImport).map(({ name }) => name));
        const defaultImportModulesCode = defaultImportModules.join();
        const importModulesCode = importModules.join(', ');
        debug(`defaultImportModules code: ${defaultImportModulesCode}`);
        debug(`importModules code: ${importModulesCode}`);
        codes.push(`import ${defaultImportModulesCode}${defaultImportModules.length && importModules.length ? ', ' : ''}${importModules.length ? `{ ${importModulesCode} }` : ''} from '${source}'`);
    });
    debug(`Import Code: ${codes}`);
    return codes.join('\n');
}


/* ================================================================================================== */

/**
 * 生成 render前 定义变量 相关的 code
 */
interface TreeNode {
    id: string | number;
    parentId: string | number;
    rootId: string | number | null;
    children?: TreeNode[];
}

/**
 * 指向组件本身
 */
const THIS = 'this';
/**
 * 组件props属性字段
 */
const PROPS = 'props';
/**
 * 组件state属性字段
 */
const STATE = 'state';

/**
 * 整理最终变量定义代码
 */
export const getRenderVariableDeclarationCode = (variables: VariableDeclaration[] = []) => {
    if (!variables.length) {
        return '';
    }
    let hasKeyMap: any = {};
    variables.forEach(({ name, source }) => {
        const dependencieTree = source.split('.') || [];
        dependencieTree.forEach((key, index) => {
            if (key) {
                if (key === THIS) {
                    // pass
                } else if ([PROPS, STATE].includes(key)) {
                    hasKeyMap[key] = {
                        ...(hasKeyMap[key] || {}),
                        parent: THIS
                    };
                } else {
                    if (index === 0) {
                        hasKeyMap[key] = hasKeyMap[key] || {
                            parent: null
                        };
                    } else {
                        hasKeyMap[key] = {
                            ...(hasKeyMap[key] || {}),
                            parent: dependencieTree[index - 1]
                        };
                    }
                }
                /* 最后一个key */
                if (dependencieTree.length - index === 1) {
                    hasKeyMap[name] = {
                        parent: key
                    };
                }
            }
        });
    });
    const mapToArray = Object.keys(hasKeyMap).map((key: string) => {
        return {
            id: key,
            parentId: hasKeyMap[key].parent || THIS
        };
    });
    const treeDatas = toTreeData(mapToArray, {
        id: 'id',
        parentId: 'parentId',
        rootId: THIS
    });
    const stringDatas = toTreeRenderVariable(treeDatas).split('\n');
    const codes = stringDatas.slice(0, stringDatas.length - 1).join('\n'); // 去除最后一个回车
    return `${codes}`;
};

/**
 * 数组转化 树形数组
 *
 * @typedef {Object} attrParams
 * @property {number} rootId Top parentId
 * @property {string} id 当前Id
 * @property {string} parentId 父级Id
 *
 * @param {Array} 转化的数组
 * @type {attrParams}
 * @return {Array}  返回树形数组
 */
export function toTreeData(data: any[], attributes: TreeNode = {
    id: 'id',
    parentId: 'parentId',
    rootId: null
}) {
    let resData = [...data], tree = [];
    function run(chiArr: any[]) {
        if (resData.length !== 0) {
            for (let i = 0; i < chiArr.length; i++) {
                for (let j = 0; j < resData.length; j++) {
                    if (chiArr[i][attributes.id] === resData[j][attributes.parentId]) {
                        chiArr[i]['children'] = chiArr[i]['children'] || [];
                        chiArr[i].children.push(resData[j]);
                        resData.splice(j, 1);
                        j--;
                    }
                }
                if (chiArr[i].children) {
                    run(chiArr[i].children);
                }
            }
        }
    }

    for (let i = 0; i < resData.length; i++) {
        if (resData[i][attributes.parentId] === attributes.rootId) {
            tree.push(resData[i]);
            resData.splice(i, 1);
            i--;
        } else if (data.every((res) => res[attributes.id] !== resData[i][attributes.parentId])) {
            tree.push(resData[i]);
            resData.splice(i, 1);
            i--;
        }
    }
    run(tree);
    return tree;
}

/**
 * 递归树型结构
 */
const toTreeRenderVariable = (treeDatas: TreeNode[], parentNode?: TreeNode) => {
    let result = '';
    result += toRenderVariable(treeDatas, parentNode);
    treeDatas.forEach((data) => {
        const { children } = data;
        if (children && children.length) {
            result += toTreeRenderVariable(children, data);
        }
    });
    return result;
};

/**
 * 拼接变量声明
 */
const toRenderVariable = (nodes: TreeNode[], parentNode?: TreeNode) => {
    const grandParentId = (parentNode || {}).parentId;
    const [{parentId}] = nodes;
    if (parentId === THIS) {
        return '';
    } else {
        return `const { ${nodes.map(({id}) => id).join(', ')} } = ${grandParentId === THIS ? THIS + '.' : ''}${parentId}\n`;
    }
};


/* ================================================================================================== */

/**
 * 生成 state 定义变量 相关的 code
 */

export const getStateVariableDeclarationCode = (states: VariableFromState[] = []) => {
    let result = '';
    if (!states.length) {
        return result;
    }

    result = `
        state = {
            ${states.map(renderObjectCode).join('')}
        }
    `;
    return result;
};

export const renderObjectCode = ({key, value}: VariableFromState) => {
    return `${key}: ${value},\n`;
};