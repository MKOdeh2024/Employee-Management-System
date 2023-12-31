import winston from 'winston';

const loggerBase = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { project: 'linked.ps', time: new Date() },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'logs/error.log', level: 'error'}),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
        format: winston.format.simple(),
      })
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    loggerBase.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
export{loggerBase}