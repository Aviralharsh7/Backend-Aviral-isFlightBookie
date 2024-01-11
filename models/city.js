"use strict";

const {Model, DataTypes} = require('sequelize');
const { db } = require("./index");

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
        sequelize: db.sequelize,
        modelName: 'City',
    }
);
module.exports = City;