import fsExtra from 'fs-extra';
import prettier from 'prettier';
import prettierConfig from 'Src/utils/prettierConfig';

/**
 * 将内容写入文件
 * @param targetPath 目标文件地址
 * @param content 文件内容
 * @param format 是否使用 prettier 格式化文件
 */
export function writeFile(targetPath: string, content: string, format = true) {
    const formatContent = format ? prettier.format(content, prettierConfig) : content;
    fsExtra.outputFileSync(targetPath, formatContent, { encoding: 'utf-8' });
}
