const { CrudRespository } = require('./crud-repo');
const { Airport} = require('../models/index');

class AirportRespository extends CrudRespository {
    constructor() {
        super(Airport);
    }
}

module.exprts = AirportRespository;