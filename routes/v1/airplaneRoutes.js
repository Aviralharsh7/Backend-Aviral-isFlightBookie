const express = require('express');
const router = express.Router();

const { airplaneController} = require('../../controllers');
const { airplaneMiddleware} = require('../../middlewares');
const { verifyJWT} = require('../../config');


// URL path : /api/v1/airplanes
router.get('/', airplaneController.getAllAirplane);

// URL path : /api/v1/airplanes/:id
router.get('/:id', airplaneController.getAirplane);

// URL path : /api/v1/airplanes/:id
router.delete(
  "/:id", 
  verifyJWT, 
  airplaneController.destroyAirplane
);


// URL path : /api/v1/airplanes/
router.post(
  "/", 
  verifyJWT,
  airplaneMiddleware.validateCreateRequest,
  airplaneMiddleware.validateSeats,
  airplaneController.createAirplane
);

// URL path : /api/v1/airplanes/:id
router.patch(
  "/:id",
  verifyJWT,
  airplaneMiddleware.validateUpdateRequest,
  airplaneController.updateAirplane
);

module.exports = router;
