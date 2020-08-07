import { createLogger, format, transports } from 'winston';

const { combine, timestamp, json, prettyPrint, colorize, simple } = format;

const transportHelpers = [
    new transports.Console({
        format: simple()
    }),
];

// 配置日志生成对象
const logger = createLogger({
    level: 'info',
    format: combine(
        colorize(),
        json(),
        timestamp({
            format: 'YY-MM-DD HH:mm:ss'
        }),
        prettyPrint(),
    ),
    transports: transportHelpers,
    exceptionHandlers: transportHelpers.concat([
        new transports.File({ filename: 'log/exceptions.log' }),
    ])
});

export default logger;
