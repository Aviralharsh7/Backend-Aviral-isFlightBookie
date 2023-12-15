const {logger } = require('./config/loggerConfig');
const { PORT } = require("./config/serverConfig");
const {sequelize} = require('./models/index');

const express = require('express');
const app = express();

const path = require('path');
const http = require('http');

const routes = require('./routes/index');

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


// start server
app.set('port', PORT);
sequelize.sync({force: true})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to sync models with the database:', error);
  });

module.exports = app;