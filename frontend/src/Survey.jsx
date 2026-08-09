```jsx
import { useState } from "react";
import axios from "axios";

const Survey = () => {
    const [formData, setFormData] = useState({
        employeeId: "",
        workload: "",
        managerSupport: "",
        workLifeBalance: "",
        comment: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.employeeId ||
            !formData.workload ||
            !formData.managerSupport ||
            !formData.workLifeBalance
        ) {
            setMessage("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            await axios.post(
                "http://localhost:3000/api/surveys",
                formData
            );

            setMessage("✅ Survey submitted successfully!");

            setFormData({
                employeeId: "",
                workload: "",
                managerSupport: "",
                workLifeBalance: "",
                comment: ""
            });

        } catch (error) {
            console.error("Survey submission error:", error);

            setMessage(
                "❌ Failed to submit survey. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="survey-container">

            <h1>Weekly Pulse Survey</h1>

            <p>
                Please complete the survey to share your current
                workplace experience.
            </p>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="employeeId">
                        Employee ID
                    </label>

                    <input
                        type="text"
                        id="employeeId"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        placeholder="Enter your employee ID"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="workload">
                        Workload (1 - 5)
                    </label>

                    <select
                        id="workload"
                        name="workload"
                        value={formData.workload}
                        onChange={handleChange}
                    >
                        <option value="">
                            Select a rating
                        </option>
                        <option value="1">1 - Very Low</option>
                        <option value="2">2 - Low</option>
                        <option value="3">3 - Moderate</option>
                        <option value="4">4 - High</option>
                        <option value="5">5 - Very High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="managerSupport">
                        Manager Support (1 - 5)
                    </label>

                    <select
                        id="managerSupport"
                        name="managerSupport"
                        value={formData.managerSupport}
                        onChange={handleChange}
                    >
                        <option value="">
                            Select a rating
                        </option>
                        <option value="1">1 - Very Poor</option>
                        <option value="2">2 - Poor</option>
                        <option value="3">3 - Average</option>
                        <option value="4">4 - Good</option>
                        <option value="5">5 - Excellent</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="workLifeBalance">
                        Work-Life Balance (1 - 5)
                    </label>

                    <select
                        id="workLifeBalance"
                        name="workLifeBalance"
                        value={formData.workLifeBalance}
                        onChange={handleChange}
                    >
                        <option value="">
                            Select a rating
                        </option>
                        <option value="1">1 - Very Poor</option>
                        <option value="2">2 - Poor</option>
                        <option value="3">3 - Average</option>
                        <option value="4">4 - Good</option>
                        <option value="5">5 - Excellent</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="comment">
                        Comment
                    </label>

                    <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder="Share any additional feedback..."
                        rows="5"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Survey"}
                </button>

                {message && (
                    <p className="survey-message">
                        {message}
                    </p>
                )}

            </form>
        </div>
    );
};

export default Survey;
```
