const Survey = require("../models/Survey");

exports.getWellnessTrends = async (req, res) => {
    try {
        const surveys = await Survey.find().populate("pulseSurvey");

        const weeklyData = {};

        surveys.forEach((survey) => {
            if (!survey.pulseSurvey) {
                return;
            }

            const week = survey.pulseSurvey.weekNumber;

            if (!weeklyData[week]) {
                weeklyData[week] = {
                    totalResponses: 0,
                    totalWorkload: 0,
                    totalManagerSupport: 0,
                    totalWorkLifeBalance: 0
                };
            }

            weeklyData[week].totalResponses++;
            weeklyData[week].totalWorkload += survey.workload;
            weeklyData[week].totalManagerSupport += survey.managerSupport;
            weeklyData[week].totalWorkLifeBalance += survey.workLifeBalance;
        });

        const result = Object.keys(weeklyData).map((week) => ({
            weekNumber: Number(week),
            totalResponses: weeklyData[week].totalResponses,

            averageWorkload: Number(
                (
                    weeklyData[week].totalWorkload /
                    weeklyData[week].totalResponses
                ).toFixed(2)
            ),

            averageManagerSupport: Number(
                (
                    weeklyData[week].totalManagerSupport /
                    weeklyData[week].totalResponses
                ).toFixed(2)
            ),

            averageWorkLifeBalance: Number(
                (
                    weeklyData[week].totalWorkLifeBalance /
                    weeklyData[week].totalResponses
                ).toFixed(2)
            )
        }));

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};