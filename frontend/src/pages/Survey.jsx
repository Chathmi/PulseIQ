import { useEffect, useState } from "react";
import axios from "axios";

function Survey() {
  const [pulseSurvey, setPulseSurvey] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: "",
    workload: "",
    managerSupport: "",
    workLifeBalance: "",
    department: "",
    comment: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPulseSurvey = async () => {
      try {
        const response = await axios.get("/api/pulse-surveys");

        const surveys = response.data.data || [];
        const activeSurvey =
          surveys.find((survey) => survey.isActive) || surveys[0];

        setPulseSurvey(activeSurvey);
      } catch (error) {
        console.error("Failed to load pulse survey:", error);
        setMessage("Unable to load the weekly survey.");
      } finally {
        setLoading(false);
      }
    };

    fetchPulseSurvey();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.employeeId ||
      !formData.workload ||
      !formData.managerSupport ||
      !formData.workLifeBalance ||
      !formData.department ||
      !formData.comment.trim()
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (!pulseSurvey?._id) {
      setMessage("No active survey is available.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      await axios.post("/api/surveys", {
        employeeId: Number(formData.employeeId),
        pulseSurvey: pulseSurvey._id,
        workload: Number(formData.workload),
        managerSupport: Number(formData.managerSupport),
        workLifeBalance: Number(formData.workLifeBalance),
        department: formData.department,
        comment: formData.comment.trim(),
      });

      setMessage("Survey submitted successfully!");

      setFormData({
        employeeId: "",
        workload: "",
        managerSupport: "",
        workLifeBalance: "",
        department: "",
        comment: "",
      });
    } catch (error) {
      console.error("Survey submission error:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to submit the survey. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading weekly survey...</p>;
  }

  return (
    <div className="survey-page">
      <h1>Employee Wellness Survey</h1>

      {pulseSurvey && (
        <>
          <h2>{pulseSurvey.title}</h2>

          <p>
            Please take a moment to share how you're doing this week.
          </p>

          {message && <p>{message}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="employeeId"
              placeholder="Employee ID"
              value={formData.employeeId}
              onChange={handleChange}
            />

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>

            <label>Workload</label>
            <select
              name="workload"
              value={formData.workload}
              onChange={handleChange}
            >
              <option value="">Select rating</option>
              <option value="1">1 - Very Low</option>
              <option value="2">2 - Low</option>
              <option value="3">3 - Moderate</option>
              <option value="4">4 - High</option>
              <option value="5">5 - Very High</option>
            </select>

            <label>Manager Support</label>
            <select
              name="managerSupport"
              value={formData.managerSupport}
              onChange={handleChange}
            >
              <option value="">Select rating</option>
              <option value="1">1 - Very Poor</option>
              <option value="2">2 - Poor</option>
              <option value="3">3 - Average</option>
              <option value="4">4 - Good</option>
              <option value="5">5 - Excellent</option>
            </select>

            <label>Work-Life Balance</label>
            <select
              name="workLifeBalance"
              value={formData.workLifeBalance}
              onChange={handleChange}
            >
              <option value="">Select rating</option>
              <option value="1">1 - Very Poor</option>
              <option value="2">2 - Poor</option>
              <option value="3">3 - Average</option>
              <option value="4">4 - Good</option>
              <option value="5">5 - Excellent</option>
            </select>

            <textarea
              name="comment"
              placeholder="Share any comments or feedback..."
              value={formData.comment}
              onChange={handleChange}
              rows="5"
            />

            <button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Survey"}
            </button>
          </form>
        </>
      )}

      {!pulseSurvey && !message && (
        <p>No active survey is currently available.</p>
      )}
    </div>
  );
}

export default Survey;