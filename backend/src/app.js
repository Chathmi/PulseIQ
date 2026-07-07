const express = require("express");

const healthRoutes = require("./routes/healthRoutes");

const app = express();

app.use(express.json());

// Health Check Route
app.use("/health", healthRoutes);

module.exports = app;