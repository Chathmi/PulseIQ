exports.checkHealth = (req, res) => {
    res.json({
        status: "OK",
        message: "PulseIQ Backend is running."
    });
};