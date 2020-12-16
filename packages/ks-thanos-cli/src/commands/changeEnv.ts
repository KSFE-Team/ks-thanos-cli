import { successText } from 'Src/utils/log';
import { execSync } from 'child_process';
import path from 'path';

/**
 * 运行拉取nginx配置命令
 */
export async function runChangeEnv(
    options: {
        port: number;
        env: 'Dev' | 'Test' | 'Gamma';
    }
) {
    const { port, env } = options;
    const cwd = process.cwd();
    const scriptPath = path.join(cwd, 'src/commands/shells/change_env.sh');
    /* 重启nginx */
    execSync(`bash ${scriptPath} ${port} ${env}`);
    console.log(successText('nginx重启成功'));
}