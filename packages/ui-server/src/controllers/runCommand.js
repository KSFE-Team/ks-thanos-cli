import { sendLog } from '../socket';
import kill from 'tree-kill';

let spawns = {};

export default function(context) {
    console.log(JSON.stringify(context.query));
    const cwd = context.query.cwd;

    if (!cwd) {
        context.body = {
            code: -1,
            message: '请选择项目'
        };
    }

    const childProcess = require('child_process');

    if (context.query.command === 'stop') {
        sendLog(`stopping ${cwd}\n`);
        sendLog(`\n`);
        if (spawns[cwd]) {
            kill(spawns[cwd], () => {
                sendLog(`stopped, thanks for use!!!\n`);
            });
            delete spawns[cwd];
        } else {
            sendLog(`no work need to stop!!!\n`);
        }
        context.body = {
            code: 0,
            result: 'success'
        };
        return;
    }

    if (spawns[cwd] && context.query.command === 'start') {
        kill(spawns[cwd]);
    }

    const spawnObj = childProcess.spawn(`npm`, [context.query.command], {cwd, encoding: 'utf-8'});
    spawnObj.stdout.on('data', function(chunk) {
        sendLog(chunk.toString());
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
