const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/healthRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const pulseSurveyRoutes = require("./routes/pulseSurveyRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const organizationHealthRoutes = require("./routes/organizationHealthRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/pulse-surveys", pulseSurveyRoutes);
app.use("/api/organization-health", organizationHealthRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health Check Route
app.use("/health", healthRoutes);
app.use("/api/surveys", surveyRoutes);

module.exports = app;