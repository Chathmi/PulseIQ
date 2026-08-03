const express = require("express");
const router = express.Router();

const pulseSurveyController = require("../controllers/pulseSurveyController");

router.post("/", pulseSurveyController.createPulseSurvey);

router.get("/", pulseSurveyController.getPulseSurveys);

module.exports = router;