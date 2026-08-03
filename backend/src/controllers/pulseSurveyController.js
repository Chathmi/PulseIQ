const PulseSurvey = require("../models/PulseSurvey");

// Create survey
exports.createPulseSurvey = async (req, res) => {
    try {
        const survey = await PulseSurvey.create(req.body);

        res.status(201).json({
            success: true,
            message: "Pulse survey created successfully.",
            data: survey
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all pulse surveys
exports.getPulseSurveys = async (req, res) => {
    try {
        const surveys = await PulseSurvey.find();

        res.status(200).json({
            success: true,
            count: surveys.length,
            data: surveys
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};