const {airplaneService} = require('../services');
const { StatusCodes} = require('http-status-codes');
const { successResponse, errorResponse} = require('../utils/responseFormatting');

async function getAllAirplane( req, res) {
    try{
        const airplanes = await airplaneService.getAllAirplane();
        successResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(successResponse);

    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function getAirplane(req, res) {
    try{
        const airplane = await airplaneService.getAirplane(req.params.id);
        successResponse.data = airplane
        return res.status(StatusCodes.OK).json(successResponse);

    } catch (error){
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);    // extracts status code from error object
    }
}

async function destroyAirplane(req, res){
    try {
        const airplane = await airplaneService.destroyAirplane(req.params.id);
        successResponse.data = airplane;
        return res.status(StatusCodes.OK).json(successResponse);
    
    } catch (error){
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function createAirplane( req, res){
    try {
        const airplane = await airplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity,
        });
        successResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json(successResponse);

    } catch (error){
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function updateAirplane(req, res){
    try {
        const airplane = await airplaneService.updateAirplane(
            req.params.id,
            req.body
        );
        successResponse.data = airplane;
        return res.status(StatusCodes.OK).json(successResponse);

    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}


module.exports = {
    getAllAirplane,
    getAirplane,
    destroyAirplane,
    createAirplane,
    updateAirplane
}