const {CrudRepository} = require('./crudRepository');
const { Airport } = require('../models');

class AirplaneRepository extends CrudRepository{
    constructor(){
        super(Airport);
    }
}

module.exports = {
    AirplaneRepository
};