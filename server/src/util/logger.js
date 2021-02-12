const winston = require('winston');

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.metadata({fillExcept: ['message', 'level', 'timestamp', 'label']})
    ),
    transports: [
        new winston.transports.File({filename: 'logs/error.log', level: 'error', format: winston.format.json()}),
        new winston.transports.File({filename: 'logs/combined.log', format: winston.format.json()})
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(info => {
                let log = `${info.level} - ${info.timestamp} - ${info.message}`;
                if (Object.keys(info.metadata).length !== 0) {
                    log += ` - ${JSON.stringify(info.metadata)}`;
                }
                return log;
            })
        )
    }));
}

module.exports = logger;
