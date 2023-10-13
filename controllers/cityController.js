const {StatusCodes} = require('http-status-codes');
const {successResponse, errorResponse} = require('../utils/responseFormatting');

const {cityService} = require('../services');

async function getAllCity(req, res){
    try { 
        const allCity = await cityService.getAllCity();
        successResponse.data = allCity;
        return res.status(StatusCodes.OK).json(successResponse);

    } catch (error){
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function destroyCity(req, res){
    try {
        const city = await cityService.destroyCity(req.params.id);
        successResponse.data = city;
        return res.status(StatusCodes.OK).json(successResponse);

    } catch (error){
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function createCity(req, res) {
    try {
        const city = await cityService.createCity({
        name: req.body.name,
        });
        successResponse.data = city;
        return res.status(StatusCodes.CREATED).json(successResponse);

    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
  }
}

async function updateCity(req, res) {
    try {
        const cities = await cityService.updateCity(req.params.id, req.body);
        successResponse.data = cities;
        return res.status(StatusCodes.OK).json(successResponse);

    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
  }
}

module.exports = {
    getAllCity,
    destroyCity, 
    createCity,
    updateCity
}