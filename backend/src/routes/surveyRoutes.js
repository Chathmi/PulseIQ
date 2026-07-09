const express = require("express");
const router = express.Router();

const surveyController = require("../controllers/surveyController");

router.get("/", surveyController.getSurvey);
router.get("/:id", surveyController.getSurveyById);
router.put("/:id", surveyController.updateSurvey);
router.delete("/:id", surveyController.deleteSurvey);
router.post("/", surveyController.submitSurvey);

module.exports = router;