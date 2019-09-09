// import ESLint from 'eslint';
import { spawnSync } from 'child_process';

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
