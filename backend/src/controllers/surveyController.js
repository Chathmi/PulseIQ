const surveys = require("../data/surveys");
exports.getSurvey = (req, res) => {
    res.status(200).json({
        totalSurveys: surveys.length,
        surveys: surveys
    });
};
exports.getSurveyById = (req, res) => {
    const id = parseInt(req.params.id);

    const survey = surveys.find((survey) => survey.id === id);

    if (!survey) {
        return res.status(404).json({
            message: "Survey not found"
        });
    }

    res.status(200).json(survey);
};
exports.updateSurvey = (req, res) => {
    const id = parseInt(req.params.id);

    const survey = surveys.find((survey) => survey.id === id);

    if (!survey) {
        return res.status(404).json({
            message: "Survey not found"
        });
    }

    Object.assign(survey, req.body);

    res.status(200).json({
        message: "Survey updated successfully!",
        data: survey
    });
};
exports.deleteSurvey = (req, res) => {
    const id = parseInt(req.params.id);

    const index = surveys.findIndex((survey) => survey.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Survey not found"
        });
    }

    const deletedSurvey = surveys.splice(index, 1);

    res.status(200).json({
        message: "Survey deleted successfully!",
        data: deletedSurvey[0]
    });
};
exports.submitSurvey = (req, res) => {
    const survey = {
        id: surveys.length + 1,
        ...req.body
    };

    surveys.push(survey);

    res.status(201).json({
        message: "Survey submitted successfully!",
        data: survey
    });
};