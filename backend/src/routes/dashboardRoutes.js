const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get("/summary", dashboardController.getDashboardSummary);
router.get("/weekly", dashboardController.getWeeklyAnalytics);
router.get("/insights", dashboardController.getInsights);
router.get("/departments", dashboardController.getDepartmentAnalytics);
router.get("/employees", dashboardController.getEmployeeTrends);
router.get("/wellness-risks", dashboardController.getWellnessRisks);

module.exports = router;