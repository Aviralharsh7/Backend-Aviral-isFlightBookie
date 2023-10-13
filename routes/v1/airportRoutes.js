const express = require('express');
const router = express.Router();

const {airportController} = require('../../controllers');
const {airportMiddleware} = require('../../middlewares');

// URL path : /api/v1/airports/
router.get('/', airportController.getAllAirport);

// URL path : /api/v1/airports/:id
router.get('/:id', airportController.getAirport);

// URL path : /api/v1/airports/:id
router.delete("/:id", AirportController.destroyAirport);

// URL path : /api/v1/airports/:id
router.patch(
  "/:id",
  airportMiddleware.validateUpdateRequest,
  airportController.updateAirport
);

// URL path : /api/v1/airports/
router.post(
  "/",
  airportMiddleware.validateCreateRequest,
  airportController.createAirport
);

module.exports = router; 