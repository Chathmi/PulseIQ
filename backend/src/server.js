require("dotenv").config({ path: "./backend/.env" });

const app = require("./app");
const connectDB = require("./config/db");

const PORT = 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`PulseIQ Backend is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
    });