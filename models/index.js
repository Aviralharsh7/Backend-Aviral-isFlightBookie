// 'use strict';

const fs = require('fs');

const Sequelize = require('sequelize');
const process = require('process');

const path = require('path');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const configCustom = require('../config/configDB.json')[env];
const db = {};

let sequelize;
if (configCustom.use_env_variable){   
    sequelize = new Sequelize (
        process.env[configCustom.use_env_variable], 

        // The config object is still passed as an argument to the Sequelize constructor to provide additional configuration options. 
        // However, the primary connection details come from the environment variable.
        config
    );

} else {
    sequelize = new Sequelize (

        // the code falls back to direct configuration, 
        // where the connection details are provided directly within the Sequelize constructor.
        config.database, 
        config.username, 
        config.password, 
        config
    );
}

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

fs
    .readdirSync(__dirname)
    .filter(file =>{
        return (
            file.indexOf('.') !== 0 && 
            file !== basename && 
            file.slice(-3) === '.js'
        );
    })
    .forEach( file => {
        const model = require(path.join(__dirname, file))(
            sequelize, 
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });
    
// provides a central db object that contains references to all the models and the database connection
Object.keys(db).forEach( modelName => {
    if (db[modelName].associate){
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;