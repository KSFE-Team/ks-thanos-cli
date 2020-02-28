export default function(context) {
    const { cwd, ...OTHER_PARAMS } = context.query;
    if (!cwd) {
        context.body = {
            code: -1,
            message: '项目目录不正确'
        };
    }
    const childProcess = require('child_process');
    const cmd = `thanos sync --config ${JSON.stringify(OTHER_PARAMS)}`;
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
