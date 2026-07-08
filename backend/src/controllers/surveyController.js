exports.getSurvey = (req, res) => {
    res.json({
        message: "Survey API is working!"
    });
};
exports.submitSurvey = (req, res) => {
    console.log(req.body);

    res.json({
        message: "Survey submitted successfully!",
        data: req.body
    });
};