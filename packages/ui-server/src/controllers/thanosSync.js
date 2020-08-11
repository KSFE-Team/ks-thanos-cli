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
    console.log(`cmd`, cmd);
    const [tools, ...args] = cmd.split(' ');
    const thanos = childProcess.spawnSync(tools, args, {cwd, encoding: 'utf-8', stdio: 'inherit'});
    if (thanos.error) {
        context.body = {
            code: -1,
            result: 'false'
        };
    }

    if (!thanos.status) {
        context.body = {
            code: 0,
            result: 'success'
        };
    }
};
