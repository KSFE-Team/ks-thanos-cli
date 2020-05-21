import fsExtra from 'fs-extra';

export function writeFile(targetPath: string, content: string) {
    fsExtra.outputFileSync(targetPath, content, { encoding: 'utf-8' });
}
