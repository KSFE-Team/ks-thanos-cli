import fsExtra from 'fs-extra';
import { errorText } from './log';

export function writeFile(targetPath: string, content: string) {
    try {
        fsExtra.outputFileSync(targetPath, content, { encoding: 'utf-8' });
    } catch (e) {
        console.log(errorText(e));
    }
}