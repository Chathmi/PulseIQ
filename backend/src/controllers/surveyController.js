const Survey = require("../models/Survey");

// Get all surveys
exports.getSurvey = async (req, res) => {
    try {
        const surveys = await Survey.find().populate("pulseSurvey");

        res.status(200).json({
            success: true,
            count: surveys.length,
            data: surveys
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve surveys.",
            error: error.message
        });
    }
};

// Get survey by ID
exports.getSurveyById = async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);

        if (!survey) {
            return res.status(404).json({
                message: "Survey not found"
            });
        }

        res.status(200).json({
            success: true,
            data: survey
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve survey.",
            error: error.message
        });
    }
};

// Create new survey
exports.submitSurvey = async (req, res) => {
    try {
        const survey = await Survey.create(req.body);

        res.status(201).json({
            success: true,
            message: "Survey submitted successfully!",
            data: survey
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to save survey.",
            error: error.message
        });
    }
};

// Update survey
exports.updateSurvey = async (req, res) => {
    try {
        const survey = await Survey.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!survey) {
            return res.status(404).json({
                message: "Survey not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Survey updated successfully!",
            data: survey
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update survey.",
            error: error.message
        });
    }
};

// Delete survey
exports.deleteSurvey = async (req, res) => {
    try {
        const survey = await Survey.findByIdAndDelete(req.params.id);

        if (!survey) {
            return res.status(404).json({
                message: "Survey not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Survey deleted successfully!",
            data: survey
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete survey.",
            error: error.message
        });
    }
};