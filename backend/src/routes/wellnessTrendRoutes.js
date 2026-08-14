const express = require("express");
const router = express.Router();

const wellnessTrendController = require("../controllers/wellnessTrendController");

router.get("/trends", wellnessTrendController.getWellnessTrends);
router.get(
    "/summary",
    wellnessTrendController.getWellnessTrendSummary
);
router.get(
    "/insights",
    wellnessTrendController.getWellnessTrendInsights
);
router.get(
    "/employee/:employeeId",
    wellnessTrendController.getEmployeeWellnessTrends
);

module.exports = router;