const express = require('express');
const router = express.Router();

const { AirplaneController, airplaneController} = require('../../controllers');
const { AirplaneMiddlewares} = require('../../middlewares');


// URL path : /api/v1/airplanes
router.get('/', airplaneController.getAllAirplane);

// URL path : /api/v1/airplanes/:id
router.get('/:id', airplaneController.getAirplane);

// URL path : /api/v1/airplanes/:id
router.delete("/:id", AirplaneController.destroyAirplane);


// URL path : /api/v1/airplanes/
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest,
  AirplaneMiddlewares.validateSeats,
  AirplaneController.createAirplane
);

// URL path : /api/v1/airplanes/:id
router.patch(
  "/:id",
  AirplaneMiddlewares.validateUpdateRequest,
  AirplaneController.updateAirplane
);

module.exports = router;
