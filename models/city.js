"use strict";

const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) =>{
    class City extends Model {
        static associate( models){
            City.hasMany( models.Airport, {
                foreignKey: "cityId",
            });
        }
    }
    City.init(
        {
            name:{
                type: DataTypes.STRING,
                allowNull: false, 
                unique: true,
            },
        },
        {
            sequelize,
            modelName: "City",
        }
    );
    return City;
};