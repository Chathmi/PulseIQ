const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get("/summary", dashboardController.getDashboardSummary);
router.get("/weekly", dashboardController.getWeeklyAnalytics);
router.get("/insights", dashboardController.getInsights);

module.exports = router;