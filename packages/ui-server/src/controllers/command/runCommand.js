// import { sendLog } from '../socket';

let spawns = {};

export default function(context) {
    const cwd = context.query.cwd;

    if (!cwd) {
        context.body = {
            code: -1,
            message: '目录有误'
        };
    }

    const childProcess = require('child_process');

    const [CMD, ...ARGS] = context.query.command.split(' ');
    const spawnObj = childProcess.spawnSync(CMD, ARGS, {cwd, encoding: 'utf-8'});
    // spawnObj.stdout.on('data', function(chunk) {
    //     sendLog(chunk.toString());
    // });
    // spawnObj.stderr.on('data', (chunk) => {
    //     sendLog(chunk.toString());
    // });
    // spawnObj.on('close', function(code) {
    //     this.stdin.pause();
    //     console.log('close code : ' + code);
    // });
    // spawnObj.on('exit', (code) => {
    //     // sendLog(`stop ${cwd}`);
    // });
    spawns[cwd] = spawnObj.pid;

    context.body = {
        code: 0,
        result: 'success'
    };
};
