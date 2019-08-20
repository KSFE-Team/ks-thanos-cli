// import ESLint from 'eslint';
import { spawnSync } from 'child_process';

export function formatFile(filePath: string) {
    // const eslintEngine = new ESLint.CLIEngine({
    //     fix: true,
    //     useEslintrc: true
    // });
    // const lintResult = eslintEngine.executeOnFiles([
    //     filePath
    // ]);
    // ESLint.CLIEngine.outputFixes(lintResult);
    spawnSync(
        `npx`,
        [
            'eslint',
            filePath,
            '--fix'
        ]
    ); 
}