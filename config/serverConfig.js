require('dotenv').config();

const PORT = normalizePort(process.env.PORT || '4000');

function normalizePort(val){
    var port = parseInt(val, 10);
    if(isNaN (port)){
        return val;
    }
    if (port >=10){
        return port;
    }
    return false;
}

module.exports = {
    PORT
};