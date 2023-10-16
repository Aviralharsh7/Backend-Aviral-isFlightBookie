const {StatusCodes} = require('http-status-codes');
const {flightService} = require('../services');
const {successResponse, errorResponse} = require('../utils/responseFormatting');

async function getAllflight( req, res){
    try {
        const allFlight = await flightService.getAllFlight(req.query);
        successResponse.data = allFlight;
        return res.status(StatusCodes.CREATED).json(successResponse);

    } catch (error){
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function getFlight( req, res) {
    try { 
        const flight = await flightService.getFlight(req.params.id);
        successResponse.data = flight;
        return res.status(StatusCodes.OK).json(successResponse);

    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function destroyFlight( req, res){
    try {
        const flight = await flightService.destroyFlight(req.params.id);
        successResponse.data = flight;
        return res.status(StatusCodes.OK).json(successResponse);

    } catch (error){
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function createFlight( req, res){
    try {
        const flight = await flightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats,
        });
        successResponse.data = flight;
        return res.status(StatusCodes.CREATED).json(successResponse);

    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function updateSeats(req, res){
    try{
        const response = await flightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,    // seats which are booked or cancelled (out of total seats)
            dec: req.body.dec,      // if true, N then decrease seats by N else increase by N 
        });
        successResponse.data = response;
        return res.status(StatusCodes.OK).json(successResponse);

    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}


module.exports = {
    getAllFlight,
    getFlight,
    destroyFlight, 
    createFlight,
    updateSeats
}