exports.healthCheck = (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "PulseIQ Backend is running successfully!"
    });
};