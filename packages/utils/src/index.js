import * as constants from './constants';
import message from './log';
const childProcess = require('child_process');

/**
 * 获取全局yarn安装目录
 */
const getYarnGlobalDir = () => {
    const yarnInfoExec = childProcess.spawnSync('yarn', [
        'global',
        'dir',
        '--json'
    ], {encoding: 'utf-8'});
    if (!yarnInfoExec.status) {
        const { data } = JSON.parse(yarnInfoExec.stdout);
        return {
            err: false,
            data
        };
    } else {
        return {
            err: yarnInfoExec.status,
            data: ''
        };
    }
};

export {
    constants,
    message,
    getYarnGlobalDir
};
