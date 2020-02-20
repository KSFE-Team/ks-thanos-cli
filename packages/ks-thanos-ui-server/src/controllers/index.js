import logger from '../utils/logger/index';

export default function(context) {
    logger.info('hello!');
    context.body = {
        message: 'hello world!'
    };
};
