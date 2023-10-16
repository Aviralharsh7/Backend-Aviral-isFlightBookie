const express = require('express');
const router = express.Router();

const {airportController} = require('../../controllers');
const {airportMiddleware} = require('../../middlewares');
const { verifyJWT} = require('../../config');

// URL path : /api/v1/airports/
router.get('/', airportController.getAllAirport);

// URL path : /api/v1/airports/:id
router.get('/:id', airportController.getAirport);

// URL path : /api/v1/airports/:id
router.delete("/:id", verifyJWT, AirportController.destroyAirport);

// URL path : /api/v1/airports/:id
router.patch(
  "/:id",
  verifyJWT,
  airportMiddleware.validateUpdateRequest,
  airportController.updateAirport
);

// URL path : /api/v1/airports/
router.post(
  "/",
  verifyJWT,
  airportMiddleware.validateCreateRequest,
  airportController.createAirport
);

module.exports = router; 