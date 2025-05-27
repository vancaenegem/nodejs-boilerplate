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
                                            filename: `${__config.logPath}/debug.log`, 
                                            maxsize:100000 // 1Mb
                                        }),
            new winston.transports.Stream({ level: 'debug',
                                            stream: process.stdout
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
                                            filename: `${__config.logPath}/other.log`,
                                            maxsize:100000, // 1Mb
                                            maxFiles: 5 }) 
        ]
    })
};
global.__logger = global.__loggers.default;