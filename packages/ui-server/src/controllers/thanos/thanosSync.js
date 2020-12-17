import { sendLog } from '../../socket';

const spawnSync = (...ARGS) => new Promise((resolve) => {
    const childProcess = require('child_process');
    const thanos = childProcess.spawn(...ARGS);
    let resultData;
    // tools, args, {cwd}
    thanos.stdout.on('data', (data) => {
        const webpackLog = data.toString();
        sendLog(webpackLog);
        resultData = webpackLog;
        console.log(`${data}`);
    });
    thanos.stderr.on('data', (data) => {
        const webpackLog = data.toString();
        sendLog(webpackLog);
        console.log(`${data}`);
    });
    /* 进程结束 */
    thanos.on('close', (code) => {
        resolve({code, resultData});
    });
});

export default async function(context) {
    // const { cwd, cmd: CMD } = context.query;
    const { body } = context.request;
    const { cwd, cmd: CMD, args: originArgs } = body;
    if (!cwd) {
        context.body = {
            code: -1,
            message: '项目目录不正确'
        };
    }
    let ARGS = [];
    if (originArgs) {
        ARGS = JSON.parse(originArgs || []);
    }
    const formatArgs = ARGS.map(({ key, value }) => `${key} ${JSON.stringify(value)}`).join(' ');
    const cmd = `thanos ${CMD} ${formatArgs}`;
    const [tools, ...args] = cmd.split(' ');
    const result = await spawnSync(tools, args, { cwd });
    context.body = {
        code: 0,
        result: 'success',
        data: result.resultData
    };

    // const thanos = childProcess.spawnSync(tools, args, {cwd, encoding: 'utf-8', stdio: 'inherit'});
    // if (thanos.error) {
    //     context.body = {
    //         code: -1,
    //         result: 'false'
    //     };
    // }

    // if (!thanos.status) {
    //     context.body = {
    //         code: 0,
    //         result: 'success'
    //     };
    // }
};
