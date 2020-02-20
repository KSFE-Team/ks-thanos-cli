/**
 * 延时函数
 * @param ms 毫秒
 */
export async function delay(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
