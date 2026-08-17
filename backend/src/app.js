const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const healthRoutes = require("./routes/healthRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const pulseSurveyRoutes = require("./routes/pulseSurveyRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const organizationHealthRoutes = require("./routes/organizationHealthRoutes");
const wellnessTrendRoutes = require("./routes/wellnessTrendRoutes");


const app = express();

app.use(cors());
app.use("/api/wellness-trends", wellnessTrendRoutes);
app.use(express.json());

app.use("/api/pulse-surveys", pulseSurveyRoutes);
app.use("/api/organization-health", organizationHealthRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health Check Route
app.use("/health", healthRoutes);
app.use("/api/surveys", surveyRoutes);
// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
app.use(errorHandler);
module.exports = app;