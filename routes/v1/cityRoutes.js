const express = require('express');
const router = express.Router();

const {cityController} = require('../../controllers');
const {cityMiddleware} = require('../../middlewares');

// URL path : /api/v1/cities/
router.get('/', cityController.getAllCity);

// URL path : /api/v1/cities/:id
router.delete("/:id", cityController.destroyCity);

// URL path : /api/v1/cities/
router.post(
  "/",
  cityMiddleware.validateCreateRequest,
  cityController.createCity
);

// URL path : /api/v1/cities/:id
router.patch(
  "/:id",
  cityMiddleware.validateUpdateRequest,
  cityController.updateCity
);

module.exports = router; 