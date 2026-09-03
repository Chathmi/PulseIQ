import { useEffect, useState } from "react";
import axios from "axios";

function HRDashboard() {
  const [health, setHealth] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [participation, setParticipation] = useState(null);
  const [trend, setTrend] = useState(null);
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHRDashboard = async () => {
      try {
        const [
          healthRes,
          breakdownRes,
          departmentsRes,
          participationRes,
          trendRes,
          insightRes,
        ] = await Promise.all([
          axios.get("/api/organization-health/score"),
          axios.get("/api/organization-health/breakdown"),
          axios.get("/api/organization-health/department-ranking"),
          axios.get("/api/dashboard/participation"),
          axios.get("/api/wellness-trends/summary"),
          axios.get("/api/wellness-trends/insights"),
        ]);

        setHealth(healthRes.data.data);
        setBreakdown(breakdownRes.data.data);
        setDepartments(departmentsRes.data.data);
        setParticipation(participationRes.data.data);
        setTrend(trendRes.data.data);
        setInsight(insightRes.data.data);
      } catch (err) {
        console.error("HR dashboard error:", err);
        setError("Unable to load HR dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadHRDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <p>Loading HR dashboard...</p>
      </div>
    );
  }

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

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>HR Dashboard</h1>
          <p>
            Organization-wide culture and wellbeing insights at a
            glance.
          </p>
        </div>
      </div>

      {/* Organization Health */}
      <section className="dashboard-section">
        <h2>Organization Health</h2>

        <div className="health-overview">
          <div className="health-score-card">
            <p>Overall Health Score</p>

            <div className="health-score">
              {health.organizationHealthScore}
            </div>

            <span className="healthy-badge">
              {health.status}
            </span>

            <p className="health-message">
              {health.status === "Healthy"
                ? "The organization is showing a healthy overall wellbeing level."
                : "The organization may require attention in some areas."}
            </p>
          </div>

          <div className="dashboard-grid health-metrics">
            <div className="dashboard-card">
              <h3>Workload</h3>
              <strong>
                {breakdown.workload.score}/5
              </strong>
              <p>{breakdown.workload.status}</p>
            </div>

            <div className="dashboard-card">
              <h3>Manager Support</h3>
              <strong>
                {breakdown.managerSupport.score}/5
              </strong>
              <p>{breakdown.managerSupport.status}</p>
            </div>

            <div className="dashboard-card">
              <h3>Work-Life Balance</h3>
              <strong>
                {breakdown.workLifeBalance.score}/5
              </strong>
              <p>{breakdown.workLifeBalance.status}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Participation */}
      <section className="dashboard-section">
        <h2>Survey Participation</h2>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Responses</h3>
            <strong>{participation.totalResponses}</strong>
            <p>Responses recorded</p>
          </div>

          <div className="dashboard-card">
            <h3>Participating Employees</h3>
            <strong>{participation.uniqueEmployees}</strong>
            <p>Unique employees</p>
          </div>

          <div className="dashboard-card">
            <h3>Average Responses</h3>
            <strong>
              {participation.averageResponsesPerEmployee}
            </strong>
            <p>Per employee</p>
          </div>
        </div>
      </section>

      {/* Department Ranking */}
      <section className="dashboard-section">
        <h2>Department Health Ranking</h2>

        <div className="department-list">
          {departments.map((department) => (
            <div
              className="department-row"
              key={department.department}
            >
              <div className="department-rank">
                #{department.rank}
              </div>

              <div className="department-info">
                <h3>{department.department}</h3>
                <span>{department.status}</span>
              </div>

              <div className="department-score">
                {department.healthScore}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wellness Trend */}
      <section className="dashboard-section">
        <h2>Wellness Trend</h2>

        <div className="trend-card">
          <div>
            <p className="trend-label">Overall Trend</p>
            <h3>{trend.trend}</h3>
          </div>

          <div className="trend-values">
            <div>
              <span>First Week</span>
              <strong>{trend.firstWeekScore}</strong>
            </div>

            <div>
              <span>Latest Week</span>
              <strong>{trend.latestWeekScore}</strong>
            </div>

            <div>
              <span>Change</span>
              <strong>{trend.change}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Insight */}
      <section className="dashboard-section">
        <div className="status-card insight-card">
          <h2>Organization Insight</h2>
          <p>{insight.insight}</p>
        </div>
      </section>
    </div>
  );
}

export default HRDashboard;