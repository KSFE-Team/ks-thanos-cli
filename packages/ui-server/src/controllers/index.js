// import logger from '../utils/logger/index';
import file from './file';
import runNpmCommand from './command/runNpmCommand';
import runCommand from './command/runCommand';
import thanos from './thanos/thanos';
import thanosSync from './thanos/thanosSync';
import getProjectProcess from './getProjectProcess';
import getProjectConfig from './projectConfig/get';
import updateProjectConfig from './projectConfig/update';

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
