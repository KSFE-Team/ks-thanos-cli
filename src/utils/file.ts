import fsExtra from 'fs-extra';
import prettier from 'prettier';
import prettierConfig from 'Src/utils/prettierConfig';

export function writeFile(targetPath: string, content: string, format = true) {
    const formatContent = format ? prettier.format(content, prettierConfig) : content;
    fsExtra.outputFileSync(targetPath, formatContent, { encoding: 'utf-8' });
}
