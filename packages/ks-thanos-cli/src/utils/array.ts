/**
 * 数组元素独一无二化
 * @param arr 需要处理的数组
 */
export function uniqueArray(arr: any[] = []) {
    return Array.from(new Set(arr));
}
