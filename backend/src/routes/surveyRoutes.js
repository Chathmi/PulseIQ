const express = require("express");
const router = express.Router();

const surveyController = require("../controllers/surveyController");
const validateSurvey = require("../middleware/validateSurvey");

router.get("/", surveyController.getSurvey);
router.get("/:id", surveyController.getSurveyById);
router.put("/:id", surveyController.updateSurvey);
router.delete("/:id", surveyController.deleteSurvey);
router.post("/", validateSurvey, surveyController.submitSurvey);

module.exports = router;