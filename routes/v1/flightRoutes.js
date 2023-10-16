const express = require('express');
const router = express.Router();

const {flightController} = require('../../controllers');
const {flightMiddleware} = require('../../middlewares');
const { verifyJWT} = require('../../config');

// URL path : /api/flights/
router.get(
    '/',
    flightMiddleware.validateArrivalDestination_Query,
    flightController.getAllFlight
);

// URL path : /api/flights/:id
router.get("/:id", flightController.getFlight);

// URL path : /api/flights/:id
router.delete("/:id", verifyJWT, flightController.destroyFlight);

// URL path : /api/flights/
router.post(
  "/",
  verifyJWT,
  flightMiddleware.validateCreateRequest,
  flightMiddleware.validateDateTime,
  flightMiddleware.validatePriceAndSeats,
  flightMiddleware.validateArrivalDestination_Params,
  flightController.createFlight
);

// URL path : /api/flights/:id/seats
router.patch(
  "/:id/seats",
  verifyJWT,
  flightMiddleware.validateUpdateSeatsRequest,
  flightController.updateSeats
);

module.exports = router; 