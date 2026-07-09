const validateSurvey = (req, res, next) => {
    const {
        employeeId,
        workload,
        managerSupport,
        workLifeBalance,
        comment
    } = req.body;

    // Check required fields
    if (
        employeeId === undefined ||
        workload === undefined ||
        managerSupport === undefined ||
        workLifeBalance === undefined ||
        comment === undefined
    ) {
        return res.status(400).json({
            message: "All survey fields are required."
        });
    }
    // Employee ID must be a positive number
if (!Number.isInteger(employeeId) || employeeId <= 0) {
    return res.status(400).json({
        message: "Employee ID must be a positive integer."
    });
}

// Ratings must be between 1 and 5
const ratings = [workload, managerSupport, workLifeBalance];

for (const rating of ratings) {
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({
            message: "Ratings must be integers between 1 and 5."
        });
    }
}

// Comment cannot be empty
if (typeof comment !== "string" || comment.trim() === "") {
    return res.status(400).json({
        message: "Comment cannot be empty."
    });
}

    next();
};

module.exports = validateSurvey;