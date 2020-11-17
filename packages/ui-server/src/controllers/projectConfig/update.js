import fsExtra from 'fs-extra';
import path from 'path';
import { formatFile, getConfig } from '../../utils';
import { KSCONFIG_PATH } from '../../utils/constants';

export default async function(context) {
    const { body } = context.request;
    const { cwd, ...OTHER } = body;
    const config = getConfig(cwd);
    const content = `module.exports=${JSON.stringify({
        ...config,
        ...OTHER
    })}`;
    fsExtra.outputFileSync(path.resolve(cwd, KSCONFIG_PATH), content, { encoding: 'utf-8' });
    formatFile(path.resolve(cwd, KSCONFIG_PATH));
    context.body = {
        code: 0,
        result: {}
    };
};
