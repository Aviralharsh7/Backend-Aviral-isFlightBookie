const express = require('express');
const router = express.Router();

const airplaneRoutes = require('./airplaneRoutes');
const flightRoutes = require('./flightRoutes');
const airportRoutes = require('./airportRoutes');
const cityRoutes = require('./cityRoutes');

router.use('/airplanes', airplaneRoutes);
router.use("/flights", flightRoutes);
router.use("/airports", airportRoutes);
router.use("/cities", cityRoutes);


module.exports = router;