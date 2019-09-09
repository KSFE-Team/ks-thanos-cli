import Debug from './debugger';
import { execSync } from 'child_process';
import { errorText } from './log';
import fsExtra from 'fs-extra';

const debug = Debug(__filename);

export function initProjectFolder(projectName: string) {
    const branchName = 'master';
    const projectRepo = 'http://gitlab.devops.kaishustory.com/ks_h5_kms/ks-pcweb-thanos-base.git';

    debug(`Init project from git: ${projectRepo} —— ${branchName}`);

    const cmdStr = `git clone ${projectRepo} ${projectName} && cd ${projectName} && git checkout ${branchName}`;

    debug(`CMD str: ${cmdStr}`);

    try {
        execSync(cmdStr, {
            encoding: 'utf-8'
        });
    } catch (err) {
        console.log(errorText(err));
        process.exit(1);
    }

    fsExtra.removeSync(`${projectName}/.git`);
}

export function installDependencies(projectPath: string) {
    debug(`Install dependencies`);

    const cmdStr = `cd ${projectPath} && npm install`;

    try {
        execSync(cmdStr, {
            encoding: 'utf-8',
            stdio: 'inherit'
        });
    } catch(err) {
        console.log(errorText(err));
        process.exit(1);
    }
}
