import { sendLog, updateProjectProcess } from '../../socket';
import kill from 'tree-kill';
import { getStore, setStore } from '../../utils';
import { PROJECT_PROCESS_TYPE } from '../../utils/constants';
import getProjectProcess from '../getProjectProcess';
const NPM_START_COMMAND = 'start';
const NPM_STOP_COMMAND = 'stop';
const [, {key: RUNNING}, {key: FINISH}, {key: FAIL}] = PROJECT_PROCESS_TYPE;

let spawns = {};

export default function(context) {
    const { cwd, command } = context.query;

    if (!cwd) {
        context.body = {
            code: -1,
            message: '请选择项目'
        };
    }

    const childProcess = require('child_process');

    const updateProcess = () => {
        let params = {
            query: {
                cwd: context.query.cwd
            }
        };
        getProjectProcess(params);
        const { result } = params.body;
        updateProjectProcess(result);
    };

    if (command === NPM_STOP_COMMAND) {
        sendLog(`stopping ${cwd}\n`);
        sendLog(`\n`);
        if (spawns[cwd]) {
            kill(spawns[cwd], () => {
                sendLog(`stopped, thanks for use!!!\n`);
            });
            delete spawns[cwd];
            const store = getStore('projectProcess');
            delete store[cwd];
            setStore('projectProcess', store);
            updateProcess();
        } else {
            sendLog(`no work need to stop!!!\n`);
        }
        context.body = {
            code: 0,
            result: 'success'
        };
        return;
    }

    if (spawns[cwd] && command === NPM_START_COMMAND) {
        kill(spawns[cwd]);
    }

    const spawnObj = childProcess.spawn(`npm`, [command], {cwd, encoding: 'utf-8'});
    spawnObj.stdout.on('data', function(chunk) {
        const webpackLog = chunk.toString();
        sendLog(webpackLog);
        if (command === NPM_START_COMMAND) {
            const store = getStore('projectProcess');
            /* 如果日志不是成功，则认为在执行中 */
            if (!webpackLog.includes('编译成功')) {
                /* 如果已经状态是编译中 | 成功则不进行状态变更 */
                if (!(store[cwd] && (store[cwd].status === RUNNING || store[cwd].status === FINISH))) {
                    setStore('projectProcess', {
                        [cwd]: {
                            status: RUNNING,
                            pid: spawnObj.pid
                        }
                    });
                    updateProcess();
                }
            } else {
                setStore('projectProcess', {
                    [cwd]: {
                        status: FINISH,
                        pid: spawnObj.pid
                    }
                });
                updateProcess();
            }
            /* 如果日志输出失败则自动关闭子进程 */
            if (webpackLog.includes('启动失败')) {
                setTimeout(() => {
                    kill(spawns[cwd]);
                    setStore('projectProcess', {
                        [cwd]: {
                            status: FAIL,
                            pid: spawnObj.pid
                        }
                    });
                    updateProcess();
                }, 500);
            }
        }
    });
    spawnObj.stderr.on('data', (chunk) => {
        sendLog(chunk.toString());
    });
    spawnObj.on('close', function(code) {
        this.stdin.pause();
        console.log('close code : ' + code);
    });
    spawnObj.on('exit', (code) => {
        // sendLog(`stop ${cwd}`);
    });
    spawns[cwd] = spawnObj.pid;

    context.body = {
        code: 0,
        result: 'success'
    };
};
