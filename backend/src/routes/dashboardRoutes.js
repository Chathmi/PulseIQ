const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get("/summary", dashboardController.getDashboardSummary);
router.get("/weekly", dashboardController.getWeeklyAnalytics);
router.get("/insights", dashboardController.getInsights);
router.get("/departments", dashboardController.getDepartmentAnalytics);
router.get("/employees", dashboardController.getEmployeeTrends);
router.get("/wellness-risks", dashboardController.getWellnessRisks);
router.get(
    "/wellness-recommendations",
    dashboardController.getWellnessRecommendations
);
router.get("/organization-report", dashboardController.getOrganizationHealthReport);

module.exports = router;