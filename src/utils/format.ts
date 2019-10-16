// import ESLint from 'eslint';
import { spawnSync } from 'child_process';

/**
 * 使用项目的 eslint 格式化文件
 * @param filePath 文件地址
 */
export function formatFile(filePath: string) {
    spawnSync(
        `npx`,
        [
            'eslint',
            filePath,
            '--fix'
        ]
    );
}
