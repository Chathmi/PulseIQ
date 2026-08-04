const Survey = require("../models/Survey");

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
            totalResponses === 0 ? 0 : Number((totalWorkload / totalResponses).toFixed(2));

        const averageManagerSupport =
            totalResponses === 0 ? 0 : Number((totalManagerSupport / totalResponses).toFixed(2));

        const averageWorkLifeBalance =
            totalResponses === 0 ? 0 : Number((totalWorkLifeBalance / totalResponses).toFixed(2));

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