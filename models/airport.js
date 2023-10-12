"use strict";
const {DataTypes, Model} = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) =>{
    class Airport extends Model {
        static associate(models){
            Airport.belongsTo(models.City, {
                foreignKey: 'cityId',
                onDelete: 'CASCADE',
            });
        }
    }
    Airport.init(
        {
            name:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
            },
            cityId:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Airport',
        }
    );
    return Airport;
}