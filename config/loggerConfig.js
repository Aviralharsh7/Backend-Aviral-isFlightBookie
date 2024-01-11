const winston = require('winston');
const { combine, timestamp, label, printf} = winston.format;
// const { eventNames } = require('../app');

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        label({
            label: "FlightServiceAPI "
        }),
        timestamp({
            format: "DD-MM-YYYY hh:mm:ss.SSS A"
        }),
        printf(( {level, message, label, timestamp}) =>{
            return `${timestamp} : [${label}] : ${level} : ${message}`;
        })
    ),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'AllLogs.log'
        }),
    ],
});

module.exports = logger;