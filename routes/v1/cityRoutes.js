const express = require('express');
const router = express.Router();

const {cityController} = require('../../controllers');
const {cityMiddleware} = require('../../middlewares');
const { verifyJWT} = require('../../config');

// URL path : /api/v1/cities/
router.get('/', cityController.getAllCity);

// URL path : /api/v1/cities/:id
router.delete("/:id", verifyJWT, cityController.destroyCity);

// URL path : /api/v1/cities/
router.post(
  "/",
  verifyJWT,
  cityMiddleware.validateCreateRequest,
  cityController.createCity
);

// URL path : /api/v1/cities/:id
router.patch(
  "/:id",
  verifyJWT,
  cityMiddleware.validateUpdateRequest,
  cityController.updateCity
);

module.exports = router; 