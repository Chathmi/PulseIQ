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
exports.getWellnessTrendSummary = async (req, res) => {
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

        const weeks = Object.keys(weeklyData)
            .map(Number)
            .sort((a, b) => a - b);

        if (weeks.length === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    trend: "No data",
                    firstWeekScore: 0,
                    latestWeekScore: 0,
                    change: 0
                }
            });
        }

        const calculateWeeklyScore = (week) => {
            const data = weeklyData[week];

            const averageWorkload =
                data.totalWorkload / data.totalResponses;

            const averageManagerSupport =
                data.totalManagerSupport / data.totalResponses;

            const averageWorkLifeBalance =
                data.totalWorkLifeBalance / data.totalResponses;

            return Number(
                (
                    (
                        averageWorkload +
                        averageManagerSupport +
                        averageWorkLifeBalance
                    ) / 3
                ).toFixed(2)
            );
        };

        const firstWeekScore = calculateWeeklyScore(weeks[0]);
        const latestWeekScore = calculateWeeklyScore(
            weeks[weeks.length - 1]
        );

        const change = Number(
            (latestWeekScore - firstWeekScore).toFixed(2)
        );

        let trend;

        if (change > 0.1) {
            trend = "Improving";
        } else if (change < -0.1) {
            trend = "Declining";
        } else {
            trend = "Stable";
        }

        res.status(200).json({
            success: true,
            data: {
                trend,
                firstWeekScore,
                latestWeekScore,
                change
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getWellnessTrendInsights = async (req, res) => {
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

        const weeks = Object.keys(weeklyData)
            .map(Number)
            .sort((a, b) => a - b);

        if (weeks.length === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    trend: "No data",
                    insight: "There is not enough wellness data to generate an insight."
                }
            });
        }

        const calculateWeeklyScore = (week) => {
            const data = weeklyData[week];

            const averageWorkload =
                data.totalWorkload / data.totalResponses;

            const averageManagerSupport =
                data.totalManagerSupport / data.totalResponses;

            const averageWorkLifeBalance =
                data.totalWorkLifeBalance / data.totalResponses;

            return (
                averageWorkload +
                averageManagerSupport +
                averageWorkLifeBalance
            ) / 3;
        };

        const firstWeekScore = calculateWeeklyScore(weeks[0]);
        const latestWeekScore =
            calculateWeeklyScore(weeks[weeks.length - 1]);

        const change = latestWeekScore - firstWeekScore;

        let trend;
        let insight;

        if (change > 0.1) {
            trend = "Improving";
            insight =
                "Employee wellness is improving compared with the first recorded week.";
        } else if (change < -0.1) {
            trend = "Declining";
            insight =
                "Employee wellness has declined compared with the first recorded week.";
        } else {
            trend = "Stable";
            insight =
                "Employee wellness has remained relatively stable over the recorded period.";
        }

        res.status(200).json({
            success: true,
            data: {
                trend,
                insight
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};