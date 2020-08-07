import * as constants from './constants';
import message from './log';
const childProcess = require('child_process');

/**
 * 获取全局yarn安装目录
 */
const getYarnGlobalDir = () => {
    const globalPathExec = childProcess.spawnSync('npm', [
        'root',
        '-g'
    ]);
    if (!globalPathExec.status) {
        return {
            err: false,
            data: globalPathExec.stdout.toString().trim()
        };
    } else {
        return {
            err: globalPathExec.status,
            data: ''
        };
    }
};

export {
    constants,
    message,
    getYarnGlobalDir
};
