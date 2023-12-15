const {CrudRepository} = require('./crudRepository');
const {Airplane} = require('../models');

class AirplaneRepository extends CrudRepository {

    // we set the model for this instance of "CrudRepository class" 
    // which is "Airplane", using the constructor 
    // now all methods will operate on "Airplane" model
    constructor() {

        // invokes constructor of parent class
        // This is required when a child class extends a parent class and has its own constructor.
        // this child constructor is only written because we have to initialise model
        super(Airplane);      
    }
}

module.exports = AirplaneRepository;