const express = require("express");
const router = express.Router();

const organizationHealthController = require("../controllers/organizationHealthController");

router.get("/score", organizationHealthController.getOrganizationHealthScore);
router.get(
    "/status",
    organizationHealthController.getOrganizationHealthStatus
);
router.get(
    "/breakdown",
    organizationHealthController.getOrganizationHealthBreakdown
);
router.get(
    "/departments",
    organizationHealthController.getDepartmentHealth
);
router.get(
    "/department-ranking",
    organizationHealthController.getDepartmentHealthRanking
);

module.exports = router;
