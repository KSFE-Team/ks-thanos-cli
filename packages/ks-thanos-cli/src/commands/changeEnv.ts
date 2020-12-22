import { successText } from 'Src/utils/log';
import { spawn } from 'child_process';
import path from 'path';

const NGINX_ENV = ['Dev', 'Test', 'Gamma'];

/**
 * 运行拉取nginx配置命令
 */
export async function runChangeEnv(
    options: {
        config: string
    }
) {
    const { config: mutipleConfig } = options;
    const config = mutipleConfig && JSON.parse(mutipleConfig);
    const { action, port, env } = config;
    const scriptPath = path.join(__dirname, 'shells/change_env.sh');
    /* 重启nginx */
    const args = [scriptPath, action, port, env];
    const result = spawn('bash', args);

    if (action === 'set') {
        console.log(successText('切换nginx环境成功'));
        console.log(`当前代理环境：${env}`);
    } else if (action === 'get') {
        result.stdout.on('data', (data) => {
            if (data) {
                let dataStr = data.toString();
                dataStr = NGINX_ENV.find((env) => dataStr.includes(env))
                console.log(`当前代理环境：${dataStr}`);
            }
        })
    }
}