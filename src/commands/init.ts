import path from 'path';
import { initProjectFolder, installDependencies } from 'Src/utils/initProject';
import Debug from 'Src/utils/debugger';
import { infoText, warningText, errorText } from 'Src/utils/log';
import fsExtra from 'fs-extra';
import { delay } from 'bluebird';

const debug = Debug(__filename);

export async function runInit(options: {
    projectName: string;
    isForce: boolean;
}) {
    const { projectName, isForce } = options;
    const projectPath = path.join(process.cwd(), projectName);

    debug(`Run Init Command —— projectName: ${projectName}, projectPath: ${projectPath}, isForce: ${isForce}`);

    if (fsExtra.existsSync(projectName)) {
        if (isForce) {
            // 强制删除目录
            console.log(warningText(`将会删除已经存在的目录 ${projectName}, 你有 3 秒钟时间取消(CTRL-C)`));
            await delay(3000);
            console.log(errorText(`删除目标目录 ${projectName}...`));
            fsExtra.removeSync(projectName);
        } else {
            console.log(errorText(`创建项目失败：目录已经存在，请重新命名！`));
            process.exit(0);
        }
    }


    console.log(infoText('\n开始生成...\n'));
    initProjectFolder(projectName);
    console.log(infoText('\n安装依赖中...\n'));
    installDependencies(projectPath);
}
