const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errorFormatting/appError');

const {Sequelize, QueryError} = require('sequelize');
const {Logger} = require('../config');

const CrudRepository = require('./crudRepository');
const {Flight, Airplane, Airport, City} = require('../models');
const db = require('../models');

const { addRowLockOnFlight} = require('./queries');

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlight (filter,sort){
        const response = await Flight.findAll({
            where: filter, 
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true, 
                },
                {
                    model: Airport,
                    required: true,
                    as: "departureAirport",
                    on:{
                        col1: Sequelize.where(
                            Sequelize.col("Flight.departureAirportId"),
                            '=',
                            Sequelize.col('departureAirport.code')
                        ),
                    },
                    include: {
                        model: City,
                        required: true,
                    }
                },
                {
                    model: Airport,
                    reuqired: true,
                    as: "arrivalAirport",
                    on: {
                        col1: Sequelize.where(
                            Sequelize.col('Flight.arrivalAirportId'),
                            '=',
                            Sequelize.col('arrivalAirport.code')
                        ),
                    },
                    include: {
                        model: City, 
                        required: true,
                    },
                },
            ],
        });
        return response; 
    }

    async getFlight(id){
        const response = await this.model.findByPk(id, {
            include: [
                {
                    model: Airplane,
                    required: true,
                },
                {
                    model: Airport,
                    required: true,
                    as: "departureAirport",
                    on: {
                        col1: Sequelize.where(
                            Sequelize.col('Flight.departureAirportId'),
                            '=',
                            Sequelize.col('departureAirport.code')
                        ),
                    },
                    include: {
                        model: City,
                        required: true,
                    },
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1: Sequelize.where(
                            Sequelize.col('Flight.arrivalAirportId'),
                            '=',
                            Sequelize.col('arrivalAirport.code')
                        ),
                    },
                    include: {
                        model: City,
                        required: true,
                    },
                },
            ],
        });

        if(!response){
            throw new AppError(
                "Requested data for given ID could not be found",
                StatusCodes.NOT_FOUND
            );
        }
        return response;
    }

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }

    async update(id, data){
        const tableAttributes = Object.keys(this.model.rawAttributes);
        const reqAttributes = Object.keys(data);
        const hasAllAttributes = reqAttributes.every((elem) =>
            tableAttributes.includes(elem)
        );

        if(hasAllAttributes){
            const response = await this.model.update(data, {
                where: {
                    id: id,
                },
            });

            if(response [0] == 0) {
                throw new AppError(
                    "Requested data for given ID cannot be found",
                    StatusCodes.NOT_FOUND
                );
            }
            return response;
        } else {
            throw new AppError(
                "The column for the given ID cannot be found",
                StatusCodes.NOT_FOUND
            );
        }
    }

    async updateRemainingSeats(flightId, seats, dec = true){
        const transaction = await db.sequelize.transaction();
        try{
            await db.sequelize.query(addRowLockOnFlight(flightId));
            const flight = await Flight.findByPk(flightId);
            if(+dec){
                await flight.decrement(
                    "totalSeats",
                    {by: seats},
                    {transaction: transaction}
                );
            }
            await transaction.commit();
            return flight.reload();
        } catch (error){
            await transaction.rollback();
            throw new AppError(
            "Flight Service is down",
            StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = FlightRepository;