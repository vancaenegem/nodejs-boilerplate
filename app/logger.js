const winston       = require('winston');

global.__loggers = {
    default:winston.createLogger({
        exitOnError: false,
        format: winston.format.combine(
            winston.format.timestamp({    format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.simple(),
          ),
        transports: [
            new winston.transports.File({   level:'debug', 
                                            filename: `${__config.appPath}/logs/debug.log`, 
                                            })
        ]
    }),
    other:winston.createLogger({
        exitOnError: false,
        format: winston.format.combine(
            winston.format.timestamp({    format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.json(),
          ),
        transports: [
            new winston.transports.File({   level:'debug', 
                                            filename: `${__config.appPath}/logs/other.log`,
                                            maxSize:100000 }) // 1Mb
        ]
    })
};
global.__logger = global.__loggers.default;