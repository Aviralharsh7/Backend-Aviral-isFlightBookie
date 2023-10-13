const {StatusCodes} = require('http-status-codes');
const {successResponse, errorResponse} = require('../utils/responseFormatting');

const {airportService} = require('../services');

async function getAllAirport(req, res) {
    try{
        const allAirport = await airportService.getAllAirport();
        successResponse.data = allAirport;
        return res.status(StatusCodes.OK).json(successResponse);

    } catch (error){
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function getAirport (req, res){
    try {
        const airport = await airportService.getAirport(req.params.id);
        successResponse.data = airport;
        return res.status(StatusCodes.OK).json(successResponse);

    } catch (error){
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function destroyAirport(req, res) {
    try {
        const airport = await airportService.destroyAirport(req.params.id);
        successResponse.data = airport;
        return res.status(StatusCodes.OK).json(successResponse);

    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function updateAirport (req, res){
    try {
        const airport = await airportService.updateAirport(req.params.id, req.params.body);
        successResponse.data = airport;
        return res.status(StatusCodes.OK).json(successResponse);

    } catch (error){
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function createAirport( req, res){
    try {
        const airport = await airportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId,
        });
        successResponse.data = airport;
        return res.status(StatusCodes.CREATED).json(successResponse);

    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}


module.exports = {
    getAllAirport,
    getAirport,
    destroyAirport,
    updateAirport,
    createAirport
};