require('dotenv').config();

// packages 
const express = require('express');
const app = express();

const path = require('path');
const http = require('http');
const Sequelize = require("sequelize");
const db = require('./models/index');
const errorCodes = require('./utils/errorCodes');

// middleware
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser'); 


// setting port
const PORT = normalizePort(process.env.PORT || '4000');
app.set('port', PORT);

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

// setup and start the server 
const setupAndStartServer = async() =>{
    
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    console.log(errorCodes.SuccessCodes.OK);

    var server = http.createServer(app);
    server.listen(PORT, async() =>{
        console.log(`Server started at ${PORT}`);
        if (process.env.SYNC_DB) {
        db.sequelize.sync({ alter: true });
         }
    });
};

setupAndStartServer();