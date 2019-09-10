export function upperFirst(str: string) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export function lowerFirst(str: string) {
    return str.slice(0, 1).toLowerCase() + str.slice(1);
}

export function isEnglish(str: string = '') {
    return /^[a-zA-Z]+$/.test(str);
}

export function isChinese(str: string = '') {
    return /^[\u4e00-\u9fa5]+$/.test(str);
}
