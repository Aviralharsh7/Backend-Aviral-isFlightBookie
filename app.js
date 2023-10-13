const {Logger } = require('./config/logger-config');
const { ServerConfig } = require("./config/server-config");


const express = require('express');
const app = express();

const path = require('path');
const http = require('http');
const Sequelize = require("sequelize");

const routes = require('./routes/index');
const db = require('./models/index');
const errorCodes = require('./utils/httpCodes');


// middleware
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser'); 


// parsing request object 
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// mounting middleware 
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// mounting route handlers
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/root'));
app.use('/api', routes); 

// test route 
app.use('/test', require('./routes/v1/testRoutes'));


// start server
app.listen(ServerConfig.PORT, () => {
    console.log(`Server is up and running on PORT: ${ServerConfig.PORT}`);
});

module.exports = app;


// // setup and start the server 
// var server = http.createServer(app);
// server.listen(PORT, async() =>{
//     console.log(`Server started at ${PORT}`);
//     if (process.env.SYNC_DB) {
//     db.sequelize.sync({ alter: true });
//         }
// });