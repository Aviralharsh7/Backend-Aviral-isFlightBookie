const allowedOrigins = require('./allowedOrigins');
const errorCodes = require('../utils/errorCodes')

const corsOptions = {
    origin: (origin, callback) =>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        } else {
            callback( new Error ('Not allowed by CORS'));
        }
    },
    Credentials : true,
    optionsSuccessStatus: errorCodes.SuccessCodes.OK
}

module.exports = corsOptions;