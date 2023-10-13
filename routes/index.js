const express = require('express');
const router = express.Router();

const v1Routes = require('./v1');
router.use("/v1", v1Routes);              // build on /api URL path

module.exports = router;