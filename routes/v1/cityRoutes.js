const express = require('express');
const router = express.Router();

const {cityController} = require('../../controllers');
const {cityMiddleware} = require('../../middlewares');

router.get('/', cityController.getAllCity);