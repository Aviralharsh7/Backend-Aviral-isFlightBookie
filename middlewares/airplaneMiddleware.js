const {StatusCodes} = require('http-status-codes');
const {errorResponse} = require('../utils/responseFormatting');
const AppError = require('../utils/errorFormatting/appError');

function validateCreateRequest(req, res, next){
    if(!req.body.modelNumber){
        errorResponse.error = new AppError(
            "Model number not found in the incoming request",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if (!req.body.capacity){
        errorResponse.error = new AppError(
            "Capacity of Airplane not found in the incoming request",
            StatusCodes.BAD_REQUEST
        );

        // error.statusCode is not used here because Apperror's instance named "error" is not created
        // it is the case in services folder
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    // passes control to next file mounted on the route
    next();
}

function validateSeats( req, res, next){
    const airplaneSeats = req.body.capacity;
    if(airplaneSeats < 0 ){
        errorResponse.error = new AppError(
            "Negative capacity is not allowed",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
}

function validateUpdateRequest(req, res, next){
    if(Object.keys(req.body).length === 0){
        errorResponse.error = new AppError(
            "No data in incoming request",
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    // can remove this - and use validateSeats() once more in route def
    if (req.body.capacity){
        const airplaneSeats = req.body.capacity;
        if(airplaneSeats < 0) {
            errorResponse.error = new AppError (
                "Airplane capacity in incoming request is negative",
                StatusCodes.BAD_REQUEST
            );
            return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
        }
    }
    next ();
}



module.exports = {
    validateCreateRequest,
    validateSeats,
    validateUpdateRequest
}