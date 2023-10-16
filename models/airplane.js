"use strict";

const { Model, DataTypes } = require("sequelize");
// const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) =>{
    class Airplane extends Model {
        static associate (models){
            this.hasMany(models.Flight, {
                foreignKey: 'flightId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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
                allowNull: false,
                defaultValue: 0,
                validate: {
                    max: 1000,
                },
            },
        },
        {
            sequelize,
            modelName: 'Airplane',
        }
    );
    return Airplane;
}