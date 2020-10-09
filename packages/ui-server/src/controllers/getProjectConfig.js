import { getConfig } from '../utils';

export default function(context) {
    const { cwd } = context.query;
    const config = getConfig(cwd);
    context.body = {
        code: 0,
        result: config
    };
};
