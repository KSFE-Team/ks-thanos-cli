import { createLogger, format, transports } from 'winston';
import DataBaseConfig from '../../models/config';
import TransportMongoDB from './transportMongoDB';

const { combine, timestamp, json, prettyPrint, colorize, simple } = format;

const transportHelpers = [
    new transports.Console({
        format: simple()
    }),
    new TransportMongoDB({
        host: DataBaseConfig.host,
        port: DataBaseConfig.port,
        dbName: DataBaseConfig.dbName
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
        prettyPrint()
    ),
    transports: transportHelpers,
    exceptionHandlers: transportHelpers.concat([
        new transports.File({ filename: 'log/exceptions.log' }),
    ])
});

export default logger;
