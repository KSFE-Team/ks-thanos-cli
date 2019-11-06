/**
 * 首字母大写
 * @param str 需要处理的字符串
 */
export function upperFirst(str: string) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

/**
 * 首字母小写
 * @param str 需要处理的字符串
 */
export function lowerFirst(str: string) {
    return str.slice(0, 1).toLowerCase() + str.slice(1);
}

/**
 * 判断是否是英语
 * @param str 需要处理的字符串
 */
export function isEnglish(str: string = '') {
    return /^[a-zA-Z]+$/.test(str);
}

/**
 * 判断是否是中文
 * @param str 需要处理的字符串
 */
export function isChinese(str: string = '') {
    return /^[\u4e00-\u9fa5]+$/.test(str);
}
