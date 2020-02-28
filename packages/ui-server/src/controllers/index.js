// import logger from '../utils/logger/index';
import file from './file';
import runCommand from './runCommand';
import thanos from './thanos';

export default function(context) {
    // logger.info('hello!');
    context.body = {
        message: 'hello world!'
    };
};

export {
    file,
    runCommand,
    thanos
};
