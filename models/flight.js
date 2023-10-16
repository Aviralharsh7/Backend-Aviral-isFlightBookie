"use strict";

const {Model, DataTypes} = require('sequelize');
// const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) =>{
    class Flight extends Model {

        // not part of sequelize lifecycle
        // lifecycle contains hooks which define business logic, etc. 
        static associate (models){
            this.belongsTo(models.Airplane, {
                foreignKey: 'airplaneId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.belongsTo(models.Airport, {
                foreignKey: 'departureAirportId',
                as: 'departureAirport',          // multiple association bw these two models, so alias is specified.
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.belongsTo(models.Airport, {
                foreignKey: 'arrivalAirportId',
                as: 'arrivalAirport',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }

    Flight.init(
        {
            flightNumber: {
                // not unique since same flight can fly on multiple routes
                type: DataTypes.STRING,
                allowNull: false,
            },
            airplaneId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            departureAirportId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            departureTime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            arrivalAirportId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            arrivalTime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            boardingGate: {
                type: DataTypes.STRING,
            },
            totalSeats: {
                // updated to remaining seats with booking/cancellation
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Flight',
        }
    );
    return Flight;
};