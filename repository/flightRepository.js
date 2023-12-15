const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errorFormatting/appError');

const {Sequelize, QueryError} = require('sequelize');
const {logger} = require('../config');

const {CrudRepository} = require('./crudRepository');
const {Flight, Airplane, Airport, City} = require('../models');
const db = require('../models');

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlight(filter, sort) {
        const response = await Flight.findAll ({
            where: filter,
            order: sort,
            include: [
                {
                    // It tells Sequelize to join the 'Airplane' model with the 'Flight' model 
                    // to fetch information about the airplane associated with each flight.
                    model: 'Airplane',
                    // the join between 'Flight' and 'Airplane' is treated as an inner join. 
                    // This ensures that only flights with associated airplanes are returned in the result set. 
                    // Flights without associated airplanes are excluded from the results.
                    required: true,
                },
                {
                    model: 'Airport',
                    required: true,
                    as: 'departureAirport',

                    // indicates that the join should be based on the equality of 'departureAirportId' in the 'Flight' model 
                    // and 'code' in the 'Airport' model.
                    on: {
                        col1: Sequelize.where(
                            Sequelize.col ('Flight.departureAirportId'),
                            '=',
                            Sequelize.col('departureAirport.code')
                        ),
                    },

                    // 'City', should be joined with the 'Airport' model. 
                    // This allows you to fetch information about the city associated with the departure airport.
                    include: {
                        model: 'City', 
                        required: true,
                    },
                },
                {
                    model: 'Airport',
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1: Sequelize.where(
                            Sequelize.col(Flight.arrivalAirportId),
                            '=',
                            Sequelize.col('arrivalAirport.code')
                        ),
                    },
                    include: 
                    {
                        model: 'City',
                        required: true,
                    },
                },
            ],
        });

        if (!response){
            throw new AppError (
                "Requested data cannot be found",
                StatusCodes.NOT_FOUND
            );
        }
        return response;
    }

    async getFlight (id) {
        const response = await Flight.findByPk (id, {
            include: [
                {
                    model: Airplane,
                    required: true,
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',

                    // overriding the default join location (primary key column)
                    on: {
                        col1: Sequelize.where(
                            Sequelize.col('Flight.departureAirportId'),
                            '=',
                            Sequelize.col('departureAirport.code')
                        ),
                    },
                    include: {
                        model: 'City',
                        required: true,
                    }
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
                        model: 'City',
                        required: true,
                    },
                },
            ],
        });

        if (!response) {
            throw new AppError(
                "Requested data cannot be found",
                StatusCodes.NOT_FOUND
            );
        }
        return response;
    }

    async updateRemainingSeats(flightId, seats, dec = true) {

        function addRowLockOnFlight(flightId) {
            return `SELECT * FROM Flights WHERE Flights.id = ${flightId} FOR UPDATE;`;
        }

        const transaction = await db.sequelize.transaction();

        try { 

            // use of db object for writing SQL query
            await db.sequelize.query(addRowLockOnFlight(flightId));
            const flight = await Flight.findByPk(flightId);
            if (+dec){
                await flight.decrement(
                    'totalSeats',
                    {by: seats},
                    {transaction: transaction}
                );
            } else {
                await flight.increment(
                    'totalSeats',
                    {by: seats},
                    {transaction: transaction}
                );
            }
            await transaction.commit();
            return flight.reload();

        } catch (error){
            await transaction.rollback();
            throw new AppError(
                "Requested changes cannot be made. Try again",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = FlightRepository;