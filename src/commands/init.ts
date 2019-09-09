import path from 'path';
import { initProjectFolder, installDependencies } from 'Src/utils/initProject';
import Debug from 'Src/utils/debugger';
import { infoText, warningText, errorText } from 'Src/utils/log';
import fsExtra from 'fs-extra';
import { delay } from 'bluebird';
import { prompt } from 'inquirer';

const debug = Debug(__filename);

export async function runInit(options: {
    isForce: boolean;
}) {
    const { isForce } = options;

    const questions = [
        {
            type: 'input',
            name: 'projectName',
            message: '项目名称',
            validate: (value: string) => {
                if (!value) {
                    return '请输入项目名称';
                }
                if (fsExtra.existsSync(value) && !isForce) {
                    return '目录已经存在，请重新命名！';
                }
                return true;
            },
        },
    ];

    const { projectName } = await prompt(questions);
    const projectPath = path.join(process.cwd(), projectName);

    debug(`Run Init Command —— projectName: ${projectName}, projectPath: ${projectPath}, isForce: ${isForce}`);

    if (fsExtra.existsSync(projectName) && isForce) {
        // 强制删除目录
        console.log(warningText(`将会删除已经存在的目录 ${projectName}, 你有 3 秒钟时间取消(CTRL-C)`));
        await delay(3000);
        console.log(errorText(`删除目标目录 ${projectName}...`));
        fsExtra.removeSync(projectName);
    }


    console.log(infoText('\n开始生成...\n'));
    initProjectFolder(projectName);
    console.log(infoText('\n安装依赖中...\n'));
    installDependencies(projectPath);
}
