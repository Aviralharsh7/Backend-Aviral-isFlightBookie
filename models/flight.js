"use strict";

const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes)=>{
    class Flights extends Model {
        static associate (models){
            Flights.belongsTo(models.Airplane, {
                foreignKey: "flightId",
            });
        }
    }
    Flights.init(
        {
            flightNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            airplaneId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            departureAirportId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            arrivalAirportId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            arrivalTime: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            departureTime: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            boardingGate: DataTypes.STRING,
            totalSeats: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Flights",
        }
    );
    return Flights;
};