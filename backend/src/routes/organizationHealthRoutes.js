const express = require("express");
const router = express.Router();

const organizationHealthController = require("../controllers/organizationHealthController");

router.get("/score", organizationHealthController.getOrganizationHealthScore);

module.exports = router;
