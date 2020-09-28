import { getStore } from '../utils';
import { PROJECT_PROCESS_TYPE } from '../utils/constants';
const [NOT_RUN_DICT] = PROJECT_PROCESS_TYPE;

export default function(context) {
    const store = getStore('projectProcess') || {};
    context.body = {
        code: 0,
        result: store[context.query.cwd] || NOT_RUN_DICT
    };
};
