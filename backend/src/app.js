const express = require("express");

const healthRoutes = require("./routes/healthRoutes");
const surveyRoutes = require("./routes/surveyRoutes");

const app = express();

app.use(express.json());

// Health Check Route
app.use("/health", healthRoutes);
app.use("/api/surveys", surveyRoutes);

module.exports = app;