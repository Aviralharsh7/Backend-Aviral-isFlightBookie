const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errorFormatting/appError');

const { Sequelize} = require('sequelize');
const { logger} = require('../config');

const { Flight, Airplane, Airport, City} = require('../models');
const db = require('../models');

class CrudRepository {
    
    // The constructor sets the model property of the CrudRepository instance to the provided model. 
    // This means that any instance of CrudRepository will be associated with a specific Sequelize model for data manipulation.
    constructor (model) {
        this.model = model;
    }

    async create (data){
        const response = await this.model.create(data);
        return response;
    }

    async destory (data){
        const response = await this.model.destory({
            where: {
                id: data,
            },
        });
        if (!response){
            throw new AppError(
                "Requested ID is not found in our database",
                StatusCodes.NOT_FOUND
            );
        }
        return response;
    }

    async get(data){
        const response = await this.model.findByPk (data);
        if (!response){
            throw new AppError(
                "Requested ID is not found in our database",
                StatusCodes.NOT_FOUND
            );
        }
        return response;
    }

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }

    async update (id, data){
        const tableAttributes = Object.keys(this.model.rawAttributes);
        const reqAttributes = Object.keys(data);
        const hasAllAttributes = reqAttributes.every((elem) =>
            tableAttributes.includes(elem)
        );
        
        if (hasAllAttributes){
            const response = await this.model.update(data, {
                where: {
                    id: id,
                },
            });

            if (response[0] == 0){
                throw new AppError(
                    "Requested ID is not found in our database",
                    StatusCodes.NOT_FOUND
                );
            }
            return response;
        } else {
            throw new AppError(
                "The column for the given ID could not be found || Incorrect data provided",
                StatusCodes.NOT_FOUND
            );
        }
    }
}

module.exports = {
    CrudRepository
};