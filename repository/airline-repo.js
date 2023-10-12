const {Airplane} = require('../models/index');

class AirplaneRepository {
    async getAirplane (id){
        try {
            const airplane = await Airplane.findByPk(id);
        } catch (error) {
            console.log("Error in repository layer");
            throw { error };
        }
    }
}

module.exports = AirplaneRepository;