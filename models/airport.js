"use strict" 
const {Model, DataTypes} = require('sequelize');
// const { sequelize } = require('.');

module.exports = (sequelize, DataTypes)=> {
    class Airport extends Model {
        static associate (models) {
            this.belongsTo(models.City, {
                foreignKey: 'cityId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });

            this.hasMany(models.Flight , {
                foreignKey: 'departureAirportId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });

            this.hasMany(models.Flight, {
                foreignKey: 'arrivalAirportId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    
    Airport.init (
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            address: {
                type: DataTypes.STRING,
                unique: true,
            },
            cityId: {
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