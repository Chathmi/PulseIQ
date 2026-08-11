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