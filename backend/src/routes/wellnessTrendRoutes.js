const express = require("express");
const router = express.Router();

const wellnessTrendController = require("../controllers/wellnessTrendController");

router.get("/trends", wellnessTrendController.getWellnessTrends);

module.exports = router;