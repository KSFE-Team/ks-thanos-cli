import fsExtra from 'fs-extra';
import path from 'path';
import { formatFile } from '../utils';
import { KSCONFIG_PATH } from '../utils/constants';

export default function(context) {
    // const { cwd } = context.query;
    // const config = getConfig(cwd);
    const { body } = context.request;
    const { cwd, ...OTHER } = body;
    const content = `module.exports=${JSON.stringify(OTHER)}`;
    fsExtra.outputFileSync(path.resolve(cwd, KSCONFIG_PATH), content, { encoding: 'utf-8' });
    formatFile(path.resolve(cwd, KSCONFIG_PATH));
    context.body = {
        code: 0,
        result: {}
    };
};
