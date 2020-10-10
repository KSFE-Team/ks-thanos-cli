// import logger from '../utils/logger/index';
import file from './file';
import runNpmCommand from './runNpmCommand';
import runCommand from './runCommand';
import thanos from './thanos';
import thanosSync from './thanosSync';
import getProjectProcess from './getProjectProcess';
import getProjectConfig from './getProjectConfig';
import updateProjectConfig from './updateProjectConfig';

export default function(context) {
    // logger.info('hello!');
    context.body = {
        message: 'hello world!'
    };
};

export {
    file,
    runNpmCommand,
    runCommand,
    thanos,
    thanosSync,
    getProjectProcess,
    getProjectConfig,
    updateProjectConfig
};
