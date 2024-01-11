const { PORT } = require("./config/serverConfig");
const {db} = require("./models");

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
app.use(cookieParser());

// mounting middleware 
app.use(cors(corsOptions));


// mounting route handlers
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/root'));
app.use('/api', routes); 


// start server
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to MySQL DB established");
  })
  .catch((error) => {
    console.log("MYSQL DB connection failed: ", error);
  });

db.sequelize.sync({ force: false });

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});

module.exports = app;