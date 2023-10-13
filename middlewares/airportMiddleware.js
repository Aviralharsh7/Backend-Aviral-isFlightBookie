const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errorFormatting/appError');
const {successResponse, errorResponse} = require('../utils/responseFormatting');

function validateUpdateRequest (req, res, next){
    if(Object.keys(req.body).length === 0){
        errorResponse.error = new AppError(
            "Data is not found in the incoming request",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next ();
}

function validateCreateRequest(req, res, next) {
    if(!req.body.name){
        errorResponse.error = new AppError(
            "Airport name not found in the incoming request",
            StatusCodes.BAD_REQUEST
        )
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.code){
        errorResponse.error = new AppError(
            "Airport code not found in the incoming request",
            StatusCodes.BAD_REQUEST
        )
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.cityId){
        errorResponse.error = new AppError(
            "CityId not found in the incoming request",
            StatusCodes.BAD_REQUEST
        )
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
}


module.export = {
    validateUpdateRequest,
    validateCreateRequest
}