const Survey = require("../models/Survey");

exports.getOrganizationHealthScore = async (req, res) => {
    try {
        const surveys = await Survey.find();

        const totalResponses = surveys.length;

        if (totalResponses === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    totalResponses: 0,
                    organizationHealthScore: 0
                }
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

        const averageWorkload = totalWorkload / totalResponses;
        const averageManagerSupport =
            totalManagerSupport / totalResponses;
        const averageWorkLifeBalance =
            totalWorkLifeBalance / totalResponses;

        const overallAverage =
            (
                averageWorkload +
                averageManagerSupport +
                averageWorkLifeBalance
            ) / 3;

        const organizationHealthScore = Number(
            (overallAverage * 20).toFixed(2)
        );

        res.status(200).json({
            success: true,
            data: {
                totalResponses,
                averageWorkload: Number(averageWorkload.toFixed(2)),
                averageManagerSupport: Number(
                    averageManagerSupport.toFixed(2)
                ),
                averageWorkLifeBalance: Number(
                    averageWorkLifeBalance.toFixed(2)
                ),
                organizationHealthScore
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getOrganizationHealthStatus = async (req, res) => {
    try {
        const surveys = await Survey.find();

        const totalResponses = surveys.length;

        if (totalResponses === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    organizationHealthScore: 0,
                    status: "No data",
                    message: "There is not enough survey data to determine organization health."
                }
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

        const averageWorkload =
            totalWorkload / totalResponses;

        const averageManagerSupport =
            totalManagerSupport / totalResponses;

        const averageWorkLifeBalance =
            totalWorkLifeBalance / totalResponses;

        const overallAverage =
            (
                averageWorkload +
                averageManagerSupport +
                averageWorkLifeBalance
            ) / 3;

        const organizationHealthScore = Number(
            (overallAverage * 20).toFixed(2)
        );

        let status;
        let message;

        if (organizationHealthScore >= 70) {
            status = "Healthy";
            message =
                "The organization is showing a healthy overall wellbeing level.";
        } else if (organizationHealthScore >= 50) {
            status = "Moderate";
            message =
                "The organization is showing a moderate wellbeing level and should continue monitoring employee feedback.";
        } else {
            status = "Needs Attention";
            message =
                "The organization may need attention in employee wellbeing and workplace experience.";
        }

        res.status(200).json({
            success: true,
            data: {
                organizationHealthScore,
                status,
                message
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getOrganizationHealthBreakdown = async (req, res) => {
    try {
        const surveys = await Survey.find();

        const totalResponses = surveys.length;

        if (totalResponses === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    workload: {
                        score: 0,
                        status: "No data"
                    },
                    managerSupport: {
                        score: 0,
                        status: "No data"
                    },
                    workLifeBalance: {
                        score: 0,
                        status: "No data"
                    }
                }
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

        const averageWorkload =
            totalWorkload / totalResponses;

        const averageManagerSupport =
            totalManagerSupport / totalResponses;

        const averageWorkLifeBalance =
            totalWorkLifeBalance / totalResponses;

        const getStatus = (score) => {
            if (score >= 3.5) {
                return "Healthy";
            } else if (score >= 2.5) {
                return "Moderate";
            } else {
                return "Needs Attention";
            }
        };

        res.status(200).json({
            success: true,
            data: {
                workload: {
                    score: Number(averageWorkload.toFixed(2)),
                    status: getStatus(averageWorkload)
                },
                managerSupport: {
                    score: Number(averageManagerSupport.toFixed(2)),
                    status: getStatus(averageManagerSupport)
                },
                workLifeBalance: {
                    score: Number(averageWorkLifeBalance.toFixed(2)),
                    status: getStatus(averageWorkLifeBalance)
                }
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};