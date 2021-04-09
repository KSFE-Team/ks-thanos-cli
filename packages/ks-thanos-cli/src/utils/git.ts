import Debug from './debugger';
import { execSync } from 'child_process';
import { errorText } from './log';

const debug = Debug(__filename);

/**
 * 页面添加项目成后，自动commit push index.js
 * @param pagePath 页面地址
 * @param templateName 模块名称
 * @param pageName 页面名称
 */
export function gitPush(pageFolderPath: string, pageName: string) {
    console.log(`🍎🍎🍎自动push ${pageFolderPath}/index.js`);

    debug(`Init push to git: ${pageName}`);

    const cmdStr = `cd ${pageFolderPath} && git add index.js && git commit -m 'thanos:${pageName}' && git push`;

    debug(`CMD str: ${cmdStr}`);

    try {
        execSync(cmdStr, {
            encoding: 'utf-8'
        });
    } catch (err) {
        console.log(errorText(err));
        process.exit(1);
    }
}
