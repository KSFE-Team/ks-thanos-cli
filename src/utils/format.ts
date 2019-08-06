import ESLint from 'eslint';

export function formatFile(filePath: string) {
    const eslintEngine = new ESLint.CLIEngine({
        fix: true,
        useEslintrc: true
    });
    const lintResult = eslintEngine.executeOnFiles([
        filePath
    ]);
    ESLint.CLIEngine.outputFixes(lintResult);
}