# Winston logger

1. Winston is a logging library for nodejs. It helps by decoupling different aspects such as log levels, formatting and storage of logs which makes each API independent and also provide multiple combinations for each of them. 
2. Log levels in winston by default - (lower is more severe) 
    
    ```jsx
    {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      verbose: 4,
      debug: 5,
      silly: 6
    }
    ```
    
    - each level corresponds to a log method with the same name
    - alternate log levels are - `**winston.config.npm.levels` , `winston.config.syslog.levels`**
    - If you prefer to change the levels to a completely custom system, you'll need to create an object and assign a number priority. Afterwards, assign that object to the `**levels`** property in the configuration object passed to the `**createLogger()`** method.
3. Creating a custom logger 
    
    ```jsx
    const winston = require('winston');
    
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    });
    ```
    
    - the level property is set to “info” so only log entries with a minimum severity of “info” (ie integer priority 2 or below) will be written and others will be supressed.
        - it comes handy when setting level to info in production and set to debug or silly in dev/test/stag environments.
    - best practise to use .env variable for level value
        
        ```jsx
        level: process.env.LOG_LEVEL || 'info',
        ```
        
4. Formatting log messages 
    - winston outputs its logs in JSON format by default.
    - the recommended practice for server applications is to stick with a structured logging format (like JSON) so that your logs can be easily machine readable for filtering and gathering insights.
    - other supported formats are placed in `**winston.format**` object
        
        ```jsx
        format: winston.format.cli(),
        ```
        
    - example of adding timestamp field to each log entry
        
        ```jsx
        const winston = require('winston');
        const { combine, timestamp, json } = winston.format;
        
        const logger = winston.createLogger({
          level: process.env.LOG_LEVEL || 'info',
          format: combine(timestamp(), json()),
          transports: [new winston.transports.Console()],
        });
        ```
        
        - the combine( ) method merges multiple formats into one
5. Transporting 
    - transports refer to the storage location for your log entries.
        - console
        - file - stores in one or more files
        - http - streams log to an http endpoint
        - stream - output logs to any nodejs stream
    - syntax for file method
        
        ```jsx
        transports: [
            new winston.transports.File({
              filename: 'combined.log',
            }),
          ],
        ```
        
    - full example
        - input
            
            ```jsx
            const winston = require('winston');
            const { combine, timestamp, json } = winston.format;
            
            const logger = winston.createLogger({
              level: process.env.LOG_LEVEL || 'info',
              format: combine(timestamp(), json()),
              transports: [
                new winston.transports.File({
                  filename: 'combined.log',
                }),
              ],
            });
            
            logger.info('Info message');
            logger.error('Error message');
            logger.warn('Warning message');
            ```
            
        - output
            
            ```jsx
            {"level":"info","message":"Info message","timestamp":"2022-01-26T09:38:17.747Z"}
            {"level":"error","message":"Error message","timestamp":"2022-01-26T09:38:17.748Z"}
            {"level":"warn","message":"Warning message","timestamp":"2022-01-26T09:38:17.749Z"}
            ```
            
    - diversifying file location based on “levels”
        
        ```jsx
        transports: [
          new winston.transports.File({
            filename: 'combined.log',
          }),
          new winston.transports.File({
            filename: 'app-error.log',
            level: 'error',      // error or more severe 
          }),
        ],
        ```