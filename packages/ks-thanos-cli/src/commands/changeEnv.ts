import { successText } from 'Src/utils/log';
import { execSync } from 'child_process';
import path from 'path';

/**
 * 运行拉取nginx配置命令
 */
export async function runChangeEnv(
    options: {
        projectPath: string;
        config: string
    }
) {
    const { projectPath, config: mutipleConfig } = options;
    const config = mutipleConfig && JSON.parse(mutipleConfig);
    const { port, env } = config;
    console.log('config', config);
    console.log('projectPath', projectPath)
    const scriptPath = path.join(__dirname, 'shells/change_env.sh');
    /* 重启nginx */
    execSync(`bash ${scriptPath} set ${port} ${env}`);
    console.log(successText('nginx重启成功'));
}