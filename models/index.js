const Sequelize = require('Sequelize');
const process = require('process');

const env = process.env.NODE_ENV || "development";
const config = require('../config/configDB')[env];
const db = {};

const sequelize = new Sequelize({
  dialect: config.dialect,

  host: process.env[config.host],
  port: process.env[config.port],

  username: process.env[config.username],
  password: process.env[config.password],
  database: process.env[config.database],
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize;

module.exports = db;