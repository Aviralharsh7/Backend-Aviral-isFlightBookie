const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errorFormatting/appError');

const {CityRepository} = require('../repository');
const cityRepository = new CityRepository();

async function getAllCity(){
    try {
        const allCity = await cityRepository.getAllCity();
        return allCity;

    } catch (error){
        throw new AppError(
            "All cities data cannot be retrieved",
            Status.code.INTERNAL_SERVER_ERROR
        );
    }
}

async function destroyCity(id) {
    try {
        const response = await cityRepository.destroyCity(id);
        return response;

    } catch (error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(
                "Request city is not found in the database",
                StatusCodes.BAD_REQUEST
            );
        }
        throw new AppError(
            "City cannot be deleted from database",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function createCity(data){
    try {
        const city = await cityRepository.createCity(data);
        return city;

    } catch (error){

        // SequelizeForeignKeyConstraintError will not occur because 
        // there is no FK in city table
        if(
            error.name == "SequelizeValidationError" || 
            error.name == "SequelizeUniqueConstraintError"
        ){
            let explanation = [];
            error.errors.ForEach((err) =>{
                explanation.push(err.message);
            });
            throw new AppError(
                explanation,
                StatusCodes.BAD_REQUEST
            );
        }
        throw new AppError(
            "New city cannot be created",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function updateCity (id, data){
    try { 
        const city = await cityRepository.updateCity(id, data);
        return city;

    } catch (error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(
                "Requested City not found in our database",
                StatusCodes.NOT_FOUND
            );
        } else if (

            // all these are client side error due incorrect data in request object
            error.name == 'SequelizeValidationError' ||
            error.name == 'SequelizeUniqueConstraintError'
        ){
            let explanation = [];
            error.errors.ForEach((err)=>{
                explanation.push(err.message);
            });
            throw new AppError(
                explanation,
                StatusCodes.BAD_REQUEST
            );
        }
        throw new AppError(
            "City data cannot be updated",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}


module.export = {
    getAllCity, 
    destroyCity,
    createCity,
    updateCity
}