const surveys = require("../data/surveys");
exports.getSurvey = (req, res) => {
    res.status(200).json({
        totalSurveys: surveys.length,
        surveys: surveys
    });
};
exports.submitSurvey = (req, res) => {
    surveys.push(req.body);

    console.log(surveys);

    res.status(201).json({
        message: "Survey submitted successfully!",
        data: req.body
    });
};