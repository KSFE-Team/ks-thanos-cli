import { successText } from 'Src/utils/log';
import { execSync } from 'child_process';
import path from 'path';

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
    const { port, env } = config;
    const scriptPath = path.join(__dirname, 'shells/change_env.sh');
    /* 重启nginx */
    execSync(`bash ${scriptPath} set ${port} ${env}`);
    console.log(successText('切换环境成功'));
}