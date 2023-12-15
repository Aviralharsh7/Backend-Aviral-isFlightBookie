const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errorFormatting/appError');

const {FlightRepository} = require('../repository');
const {Op} = require('sequelize');
const { errorResponse, successResponse } = require('../utils/responseFormatting');

const flightRepository = new FlightRepository();

async function getAllFlight(query){
    let customFilter = {};
    let sortFilter = [];

    // arr, dep delta = 24 hours 
    const endingTripTime = "23:59:00";

    if(query.trips){
        [departureAirportId, arrivalAirportId]= query.trips.split('-');
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    if(query.price){

        // example "50-100"
        [minPrice, maxPrice] = query.price.split('-');
        customFilter.price = {
            // Op.between is key of property named "price" in object named "customFilter"
            // Op.between contains an array of two elements.
            // second element value is determined by ternary operator 
            [Op.between]: [minPrice, maxPrice == undefined? 1000000: maxPrice],
        };
    }

    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]: query.travellers,
        };
    }

    if(query.tripDate){
        customFilter.departureTime = {
            [Op.between] : [query.tripDate, query.tripdate + endingTripTime],
        };
    }

    if (query.sort){

        // departureTime_ASC,price_DESC
        const params = query.sort.split(',');    
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters; 
    }

    try {
        const allFlight = await flightRepository.getAllFlight(
            customFilter,
            sortFilter
        );
        return allFlight;

    } catch (error){
        console.log(error);
        throw new AppError(
            "All flight data cannot be retrieved",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getFlight(id){
    try {
        const flight = await flightRepository.getFlight(id);
        return flight;

    } catch (error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(
                "Requested flight not found in database",
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError(
            "Flight data cannot be retrieved",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function destroyFlight (id){
    try {
        const response = await flightRepository.destroyFlight(id);
        return response;
        
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(
                "Flight not found in the database",
                StatusCodes.NOT_FOUND
            )
        }
        throw new AppError(
            "Flight data cannnot be destroyed",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function createFlight(data){
    try {
        const flight = await flightRepository.create(data);
        return flight;

    } catch (error){
        if(
            error.name == "SequelizeValidationError" ||      // data does not meet defined validation rules 
            error.name == "SequelizeUniqueConstraintError"  // voilation of unique constraint in database
        ) {
            let explanation = [];
            error.errors.ForEach((err) =>{
                explanation.push(err.message);
            });
            throw new AppError(
                explanation, 
                StatusCodes.BAD_REQUEST);
        } else if (
            // A foreign key constraint ensures that the values (in one table) match the values in a referenced table
            error.name == "SequelizeForeignKeyConstraintError" ||    
            // database connection errors, sql sytnax errors, etc but not foreign key errors
            error.name == "SequelizeDatabaseError"
        ) {
            let explanation = [];
            explanation.push(error.parent.sqlMessage);
            throw new AppError (
                explanation,
                StatusCodes.BAD_REQUEST
            );
        }
        throw new AppError(
            "New flight cannot be created",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function updateSeats(data){
    try {
        const response = await flightRepository.updateRemainingSeats(
            data.flightId,
            data.seats,
            data.dec
        );
        return response;

    } catch (error){
        if (error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(
                "Requested flight is not found in the database",
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError(
            "Flight data cannnot be updated",
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }
}


module.exports = {
    getAllFlight,
    getFlight,
    destroyFlight,
    createFlight,
    updateSeats
}