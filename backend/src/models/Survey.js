const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
    {
        employeeId: {
            type: Number,
            required: true
        },
        pulseSurvey: {
    type: require("mongoose").Schema.Types.ObjectId,
    ref: "PulseSurvey",
    required: true
},
        workload: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        managerSupport: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        workLifeBalance: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        department: {
    type: String,
    required: true
},
        comment: {
            type: String,
            required: true,
            trim: true
        }

        
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Survey", surveySchema);