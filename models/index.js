const {Sequelize} = require("sequelize");
const {dbConfig} = require("../config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize
    .authenticate()
    .then(() =>{
        console.log(
            "Connection to MySQL database has been established successfully"
        );
    })
    .catch((error) =>{
        console.error("Unable to connect to the database:", error);
    });

module.exports = {
    sequelize,
    Airplane: require("./airplane"),
    Airport: require("./airport"),
    City: require("./city"),
    Flight: require("./flight"),
};