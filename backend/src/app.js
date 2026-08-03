const express = require("express");

const healthRoutes = require("./routes/healthRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const pulseSurveyRoutes = require("./routes/pulseSurveyRoutes");

const app = express();

app.use(express.json());
app.use("/api/pulse-surveys", pulseSurveyRoutes);
// Health Check Route
app.use("/health", healthRoutes);
app.use("/api/surveys", surveyRoutes);

module.exports = app;