const express = require("express");
const router = express.Router();

const surveyController = require("../controllers/surveyController");
const validateSurvey = require("../middleware/validateSurvey");

router.get("/", surveyController.getSurvey);
router.get("/:id", surveyController.getSurveyById);
router.post("/", validateSurvey, surveyController.submitSurvey);
router.put("/:id", surveyController.updateSurvey);
router.delete("/:id", surveyController.deleteSurvey);

module.exports = router;