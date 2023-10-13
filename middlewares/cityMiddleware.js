const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errorFormatting/appError');

const {errorResponse} = require('../utils/responseFormatting/errorResponse');

function validateCreateRequest(req, res, next){
    if(!req.body.name){
        errorResponse.error = new AppError(
            "City name not found in the incoming request",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
}

function validateUpdateRequest(req, res, next){

    // object.keys returns an array of all "properties" of req.body object 
    // so length of array is count of properties in the req.body object
    if(Object.keys(req.body).length === 0){
        errorResponse.error = new AppError(
            "Data is not found in the incoming request",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
}


module.exports = {
    validateCreateRequest,
    validateUpdateRequest
};