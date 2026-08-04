const Survey = require("../models/Survey");

// Dashboard Summary
exports.getDashboardSummary = async (req, res) => {
    try {
        const surveys = await Survey.find();

        const totalResponses = surveys.length;

        let totalWorkload = 0;
        let totalManagerSupport = 0;
        let totalWorkLifeBalance = 0;

        surveys.forEach((survey) => {
            totalWorkload += survey.workload;
            totalManagerSupport += survey.managerSupport;
            totalWorkLifeBalance += survey.workLifeBalance;
        });

        const averageWorkload =
            totalResponses === 0
                ? 0
                : Number((totalWorkload / totalResponses).toFixed(2));

        const averageManagerSupport =
            totalResponses === 0
                ? 0
                : Number((totalManagerSupport / totalResponses).toFixed(2));

        const averageWorkLifeBalance =
            totalResponses === 0
                ? 0
                : Number((totalWorkLifeBalance / totalResponses).toFixed(2));

        res.status(200).json({
            success: true,
            data: {
                totalResponses,
                averageWorkload,
                averageManagerSupport,
                averageWorkLifeBalance
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Weekly Analytics
exports.getWeeklyAnalytics = async (req, res) => {
    try {
        const surveys = await Survey.find().populate("pulseSurvey");

        const weeklyData = {};

        surveys.forEach((survey) => {
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
exports.getInsights = async (req, res) => {
    try {
        const surveys = await Survey.find();

        if (surveys.length === 0) {
            return res.status(200).json({
                success: true,
                insights: ["No survey responses available."]
            });
        }

        let totalWorkload = 0;
        let totalManagerSupport = 0;
        let totalWorkLifeBalance = 0;

        surveys.forEach((survey) => {
            totalWorkload += survey.workload;
            totalManagerSupport += survey.managerSupport;
            totalWorkLifeBalance += survey.workLifeBalance;
        });

        const avgWorkload = totalWorkload / surveys.length;
        const avgManagerSupport = totalManagerSupport / surveys.length;
        const avgWorkLifeBalance = totalWorkLifeBalance / surveys.length;

        const insights = [];

        if (avgWorkload >= 4) {
            insights.push("High workload detected.");
        }

        if (avgManagerSupport <= 2.5) {
            insights.push("Low manager support detected.");
        }

        if (avgWorkLifeBalance <= 2.5) {
            insights.push("Poor work-life balance detected.");
        }

        if (insights.length === 0) {
            insights.push("No major issues detected.");
        }

        res.status(200).json({
            success: true,
            insights
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};