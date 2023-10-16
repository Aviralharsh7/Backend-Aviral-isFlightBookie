"use strict";

const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class City extends Model {
        static associate(models) {
            this.hasMany(models.Airport, {
                foreignKey: 'airportId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    City.init (
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            sequelize,
            modelName: 'City',
        }
    );
    return City;
};