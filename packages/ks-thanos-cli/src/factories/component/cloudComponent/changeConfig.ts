const acorn = require('acorn');
const escodegen = require('escodegen');

const isObject = (obj: any) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};
const isArray = (obj: any) => {
    return Object.prototype.toString.call(obj) === '[object Array]';
};
interface childrenKeys {
    type: string;
    key: string;
    value: string;
}
// ast
const CHILDREN_KEYS: childrenKeys[] = [
    { type: 'Program', key: '', value: 'body' },
    { type: 'ExportNamedDeclaration', key: '', value: 'declaration' },
    { type: 'VariableDeclaration', key: '', value: 'declarations' },
    { type: 'VariableDeclarator', key: 'id', value: 'init' },
    { type: 'ObjectExpression', key: '', value: 'properties' },
    { type: 'Property', key: 'key', value: 'value' },
    { type: 'ArrayExpression', key: '', value: 'elements' },
    { type: 'ImportExpression', key: '', value: 'source' },
    { type: 'Literal', key: '', value: '' },
];

// js转ast
const parseTree = (config: any) => {
    return acorn.parse(config, {
        ecmaVersion: 2020,
        sourceType: 'module'
    })
};
// ast转js
const escodegenTree = (parseTree: any) => {
    return escodegen.generate(parseTree);
};

// 找到当前节点key
const findTreeKey = (treeType: any): any => {
    return (CHILDREN_KEYS.find(({ type }) => type === treeType) || {}).key;
}
// 找当前节点valueKey
const findTreeValueKey = (treeType: string): any => {
    return (CHILDREN_KEYS.find(({ type }) => type === treeType) || {}).value;
}

// 处理目标节点
const handleFunc = (nodeValue: any, insertData: any) => {
    let currTreeValue = nodeValue,
        currTreeChildrenValue = currTreeValue[findTreeValueKey(currTreeValue.type)],
        currTreeChildrenValueLength = currTreeChildrenValue.length,
        endValue = currTreeChildrenValue[currTreeChildrenValueLength - 1],
        hasCurrValue = currTreeChildrenValue.some((val: any) => `${val.source.value}` === `${insertData}`);
    if (hasCurrValue) { return; };
        let newValue = {
            ...endValue,
            start: endValue.end + 10,
            end: endValue.end + 10 + insertData.length,
            source: {
                ...endValue.source,
                start: endValue.end + 17,
                end: endValue.end + 9 + insertData.length,
                value: insertData,
                raw: insertData
            }
        };
    currTreeChildrenValue.push(newValue);
}

// 寻找目标节点
const recursionTree = (tree: any, insertData?: any) => {
    let treeType = tree.type,
        treeKey = findTreeKey(treeType),
        treeValueKey = findTreeValueKey(treeType),
        treeValue = tree[treeValueKey];

    if (treeKey && tree[treeKey].name === 'model') { // 目标节点特征
        handleFunc(treeValue, insertData);
    } else {
        if (isArray(tree)) {
            tree.forEach((tr: any) => {
                recursionTree(tr, insertData)
            })
        } else if (isObject(tree)) {
            if (treeValueKey) {
                recursionTree(treeValue, insertData);
            }
        }
    }
}

export const changeConfig = (config: any, insertData: any) => {
    let asTree = parseTree(config); // js转ast
    recursionTree(asTree, insertData); // 处理ast
    let handleData = escodegenTree(asTree); // ast转js
    return handleData;
}