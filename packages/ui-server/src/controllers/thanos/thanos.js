import { thanosCallback } from '../../socket';
export default function(context) {
    const { cwd, cmd: CMD } = context.query;
    if (!cwd) {
        context.body = {
            code: -1,
            message: '项目目录不正确'
        };
    }
    const childProcess = require('child_process');
    const ARGS = JSON.parse(context.query.args || []);
    const formatArgs = ARGS.map(({key, value}) => `${key} ${JSON.stringify(value)}`).join(' ');
    const cmd = `thanos ${CMD} ${formatArgs}`;
    const [tools, ...args] = cmd.split(' ');
    context.body = {
        code: 0,
        result: 'success'
    };
    const thanos = childProcess.spawn(tools, args, {cwd});
    thanos.stdout.on('data', (data) => {
        console.log(`${data}`);
    });
    thanos.stderr.on('data', (data) => {
        console.log(`${data}`);
    });
    /* 进程结束 */
    thanos.on('close', (code) => {
        thanosCallback({
            cmd: CMD,
            cwd,
            args: ARGS
        });
    });
};
