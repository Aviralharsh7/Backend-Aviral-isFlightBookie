const { AirplaneRepository} = require('../repository');
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errorFormatting/appError');

const airplaneRepository = new AirplaneRepository;

// we do not send successResponse, errorResponse from services.
// const {successResponse, errorResponse} = require('../utils/responseFormatting');

async function getAllAirplane() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;

    } catch (error) {
        throw new AppError(
            "Data for all airplanes cannot be retrieved",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAirplane(id){
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;

    } catch (error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(
                // we override the error message thrown back from repo method
                "Airplane requested is not available in database",
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError (
            "Requested airplane's data cannot be retrieved",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function destroyAirplane (id){
    try {
        const response = await airplaneRepository.destroy(id);
        return response;

    } catch (error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(
                // we override the error message thrown back from repo method
                "Airplane requested to be deleted is not found in database",
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError(
            "Airplane data cannot be destroyed",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function createAirplane(data){       // data contains modelNumber, capacity
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;

    } catch (error){
        // A "SequelizeValidationError" typically occurs when there are validation errors while interacting with a Sequelize model.
        // Such as when trying to save a record that violates the defined validation rules.
        if(error.name == "SequelizeValidationError") {
            let explanation = [];

            //The errors property typically holds an array of validation error objects. 
            // Each error object represents a specific validation error for a particular field in the model. 
            // These objects typically contain properties such as message, type, and path, which provide details about the validation failure.
            error.errors.ForEach((err) =>{
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(
            "New Airplane cannot be created",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function updateAirplane(id, data){   // data contains airplane id, updated info
    try {
        const airplane = await airplaneRepository.update(id, data)
        return airplane;

    } catch (error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(
                "Airplane which needs to updated is not found in database",
                error.statusCode
            );
        } else if (error.name == "SequelizeValidationError"){
            let explanation = [];
            error.errors.ForEach((err) =>{
                explanation.push(err.message);
            });
            throw new AppError (
                explanation, 
                StatusCodes.BAD_REQUEST
            );
        }
        throw new AppError (
            "Airplane data cannot be updated",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}


module.exports = {
    getAllAirplane,
    getAirplane,
    destroyAirplane,
    createAirplane,
    updateAirplane
}