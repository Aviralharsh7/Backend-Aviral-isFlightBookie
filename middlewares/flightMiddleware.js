const {StatusCodes} = require('http-status-codes');
const {errorResponse, error} = require('../utils/responseFormatting/errorResponse');
const AppError = require('../utils/errorFormatting/appError');

const DateTimeCompare = require('../utils/helpers/dataTime-helpers');

function validateArrivalDestination_Query (req, res, next){
    if(req.query.trips){
        [departureAirportId, arrivalAirportId] = req.query.trips.split('-');
        
        if (departureAirportId === undefined || arrivalAirportId === undefined){
            errorResponse.error = new AppError(
                "Arrival or Departure Airport ID is incorrect",
                StatusCodes.BAD_REQUEST
            );
            return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
        }

        if (arrivalAirportId == departureAirportId){
            errorResponse.error = new AppError(
                "Arrival and Departure Airport cannot be same",
                StatusCodes.BAD_REQUEST
            );
            return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
        }
    }
    next ();
}

function validateCreateRequest(req, res, next) {
    if(!req.body.flightNumber) {
        errorResponse.error = new AppError(
            "Flight Number is not found in the incoming request",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if(!req.body.airplaneId) {
        errorResponse.error = new AppError(
            "Airplane ID is not found in the incoming request",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }   
    
    if(!req.body.departureAirportId) {
        errorResponse.error = new AppError(
            "Depature Airport ID is not found in the incoming request",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if(!req.body.arrivalAirportId) {
        errorResponse.error = new AppError(
            "Arrival Airport ID is not found in the incoming request",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if(!req.body.departureTime) {
        errorResponse.error = new AppError(
            "Depature Time is not found in the incoming request",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if(!req.body.arrivalTime) {
        errorResponse.error = new AppError(
            "Arrival Time is not found in the incoming request",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if(!req.body.price) {
        errorResponse.error = new AppError(
            "Price is not found in the incoming request",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if(!req.body.totalSeats) {
        errorResponse.error = new AppError(
            "Total Seat Count is not found in the incoming request",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next ();
}

function validateDateTime (req, res, next) {

    // time strings 
    const flightArrivalTime = req.body.arrivalTime;
    const flightDepartureTime = req.body.departureTime;
    if(
        isNaN(new Date(flightArrivalTime).getTime()) || 
        isNaN(new Date(flightDepartureTime).getTime())
    ) {
        errorResponse.error = new AppError (
            "Departure and/or Arrival Time format is incorrect",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if ( !DateTimeCompare.compare (flightArrivalTime, flightDepartureTime)) {
        errorResponse.error = new AppError(
            "Departure Time must be before Arrival time or Departure time should be 24 hour away from Current time",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next ();
}

function validatePriceAndSeats (req, res, next){
    const flightPrice = req.body.price;
    const flightSeat = req.body.totalSeats; 

    if(flightPrice < 0){
        errorResponse.error = new AppError(
            "Flight price cannot be negative",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if(flightSeat < 0){
        errorResponse.error = new AppError(
            "Flight seats cannot be negative",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next ();
}

function validateArrivalDestination_Params(req, res, next){
    if(req.body.arrivalAirportId == req.body.departureAirportId){
        errorResponse.error = new AppError(
            "Arrival and Departure Airport ID cannot be same",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
}

function validateUpdateSeatsRequest (req, res, next){
    const flightSeat = req.body.totalSeats;
    if(flightSeat < 0){
        errorResponse = new AppError(
            "Total seats in a flight cannot be negative",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if(!flightSeat){
        errorResponse = new AppError(
            "Total seats not found in the incoming request",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
}


module.exports = {
    validateArrivalDestination_Query,
    validateCreateRequest,
    validateDateTime,
    validatePriceAndSeats,
    validateArrivalDestination_Params,
    validateUpdateSeatsRequest
}