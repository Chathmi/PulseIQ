const mongoose = require("mongoose");

const pulseSurveySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        weekNumber: {
            type: Number,
            required: true
        },
        questions: {
            type: [String],
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("PulseSurvey", pulseSurveySchema);