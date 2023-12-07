const {Sequelize} = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    "flight-db",
    "root",
    "Jamesbons@7",
    {
        host: "localhost",
        dialect: "mysql",
    }
);

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

module.exports = sequelize;