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
exports.getDepartmentAnalytics = async (req, res) => {
    try {
        const surveys = await Survey.find();

        const departments = {};

        surveys.forEach((survey) => {
            const dept = survey.department;

            if (!departments[dept]) {
                departments[dept] = {
                    responses: 0,
                    workload: 0,
                    managerSupport: 0,
                    workLifeBalance: 0
                };
            }

            departments[dept].responses++;
            departments[dept].workload += survey.workload;
            departments[dept].managerSupport += survey.managerSupport;
            departments[dept].workLifeBalance += survey.workLifeBalance;
        });

        const result = Object.keys(departments).map((dept) => ({
            department: dept,
            totalResponses: departments[dept].responses,
            averageWorkload: Number(
                (departments[dept].workload / departments[dept].responses).toFixed(2)
            ),
            averageManagerSupport: Number(
                (departments[dept].managerSupport / departments[dept].responses).toFixed(2)
            ),
            averageWorkLifeBalance: Number(
                (departments[dept].workLifeBalance / departments[dept].responses).toFixed(2)
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
exports.getEmployeeTrends = async (req, res) => {
    try {
        const surveys = await Survey.find();

        const employees = {};

        surveys.forEach((survey) => {
            const id = survey.employeeId;

            if (!employees[id]) {
                employees[id] = {
                    responses: 0,
                    workload: 0,
                    managerSupport: 0,
                    workLifeBalance: 0
                };
            }

            employees[id].responses++;
            employees[id].workload += survey.workload;
            employees[id].managerSupport += survey.managerSupport;
            employees[id].workLifeBalance += survey.workLifeBalance;
        });

        const result = Object.keys(employees).map((id) => ({
            employeeId: Number(id),
            totalResponses: employees[id].responses,
            averageWorkload: Number(
                (employees[id].workload / employees[id].responses).toFixed(2)
            ),
            averageManagerSupport: Number(
                (employees[id].managerSupport / employees[id].responses).toFixed(2)
            ),
            averageWorkLifeBalance: Number(
                (employees[id].workLifeBalance / employees[id].responses).toFixed(2)
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
exports.getWellnessRisks = async (req, res) => {
    try {
        const surveys = await Survey.find();

        const employees = {};

        surveys.forEach((survey) => {
            const id = survey.employeeId;

            if (!employees[id]) {
                employees[id] = {
                    responses: 0,
                    workload: 0,
                    managerSupport: 0,
                    workLifeBalance: 0
                };
            }

            employees[id].responses++;
            employees[id].workload += survey.workload;
            employees[id].managerSupport += survey.managerSupport;
            employees[id].workLifeBalance += survey.workLifeBalance;
        });

        const risks = [];

        Object.keys(employees).forEach((id) => {
            const emp = employees[id];

            const avgWorkload = emp.workload / emp.responses;
            const avgManagerSupport = emp.managerSupport / emp.responses;
            const avgWorkLifeBalance = emp.workLifeBalance / emp.responses;

            const reasons = [];

            if (avgWorkload >= 4)
                reasons.push("High workload");

            if (avgManagerSupport <= 2.5)
                reasons.push("Low manager support");

            if (avgWorkLifeBalance <= 2.5)
                reasons.push("Poor work-life balance");

            if (reasons.length > 0) {
                risks.push({
                    employeeId: Number(id),
                    averageWorkload: Number(avgWorkload.toFixed(2)),
                    averageManagerSupport: Number(avgManagerSupport.toFixed(2)),
                    averageWorkLifeBalance: Number(avgWorkLifeBalance.toFixed(2)),
                    riskLevel: "At Risk",
                    reasons
                });
            }
        });

        res.status(200).json({
            success: true,
            totalAtRisk: risks.length,
            data: risks
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};