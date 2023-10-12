"use strict";
const {Model, DataTypes} = require("Sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    class Airplane extends Model {
        static associate(models){
            Airplane.hasMany(models.Flight, {
                foreignKey: 'airplaneId',
            });
        }
    }
    Airplane.init(
        {
            modelNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            capacity: {
                type: DataTypes.INTEGER,
                defaultValue: 200,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Airplane",
        }
    );
    return Airplane;
}