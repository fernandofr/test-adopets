import { createLogger, format, transports } from 'winston';

const configLogger = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/adopets.log`,
    }),
    new transports.Console({
      level: 'info',
    }),
  ],
});

export default configLogger;
