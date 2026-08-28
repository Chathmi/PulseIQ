import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function EmployeeDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/dashboard/summary")
      .then((response) => {
        setDashboardData(response.data.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load dashboard data.");
      });
  }, []);

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="status-card">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="dashboard-page">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back 👋</h1>
          <p>Here's an overview of your workplace wellbeing.</p>
        </div>

        <Link to="/survey" className="primary-button">
          Take Weekly Survey
        </Link>
      </div>

      <section className="dashboard-section">
        <h2>Your Wellness Overview</h2>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Responses</h3>
            <strong>{dashboardData.totalResponses}</strong>
            <p>Survey responses submitted</p>
          </div>

          <div className="dashboard-card">
            <h3>Workload</h3>
            <strong>
              {dashboardData.averageWorkload}/5
            </strong>
            <p>Your average workload rating</p>
          </div>

          <div className="dashboard-card">
            <h3>Manager Support</h3>
            <strong>
              {dashboardData.averageManagerSupport}/5
            </strong>
            <p>Your average support rating</p>
          </div>

          <div className="dashboard-card">
            <h3>Work-Life Balance</h3>
            <strong>
              {dashboardData.averageWorkLifeBalance}/5
            </strong>
            <p>Your average balance rating</p>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="status-card employee-message">
          <h2>Keep your pulse active 💙</h2>
          <p>
            Your weekly feedback helps the organization understand
            workplace wellbeing and identify areas that may need
            attention.
          </p>

          <Link to="/survey" className="secondary-button">
            Submit This Week's Feedback
          </Link>
        </div>
      </section>
    </div>
  );
}

export default EmployeeDashboard;