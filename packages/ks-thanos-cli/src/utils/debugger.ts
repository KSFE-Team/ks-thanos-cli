import debug from 'debug';
import path from 'path';

/**
 * 创建debugger
 * @param filename 文件名
 */
export default function Debug(filename: string) {
    return debug(`ks: ${path.basename(filename, '.js')} ----> `);
}
