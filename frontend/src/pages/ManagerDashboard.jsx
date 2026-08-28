import { useEffect, useState } from "react";
import axios from "axios";

function ManagerDashboard() {
  const [employees, setEmployees] = useState([]);
  const [risks, setRisks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [employeesRes, risksRes, recommendationsRes] =
          await Promise.all([
            axios.get("http://localhost:3000/api/dashboard/employees"),
            axios.get("http://localhost:3000/api/dashboard/wellness-risks"),
            axios.get(
              "http://localhost:3000/api/dashboard/wellness-recommendations"
            ),
          ]);

        setEmployees(employeesRes.data.data);
        setRisks(risksRes.data.data);
        setRecommendations(recommendationsRes.data.data);
      } catch (error) {
        console.error("Manager dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <p>Loading manager dashboard...</p>
      </div>
    );
  }

  const totalEmployees = employees.length;
  const atRiskCount = risks.length;

  const averageWorkload =
    employees.length > 0
      ? (
          employees.reduce(
            (sum, employee) => sum + employee.averageWorkload,
            0
          ) / employees.length
        ).toFixed(1)
      : "0";

  const averageSupport =
    employees.length > 0
      ? (
          employees.reduce(
            (sum, employee) => sum + employee.averageManagerSupport,
            0
          ) / employees.length
        ).toFixed(1)
      : "0";

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Manager Dashboard</h1>
          <p>
            Monitor your team's wellbeing and identify areas that
            need attention.
          </p>
        </div>
      </div>

      {/* Overview */}
      <section className="dashboard-section">
        <h2>Team Overview</h2>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Team Members</h3>
            <strong>{totalEmployees}</strong>
            <p>Employees with responses</p>
          </div>

          <div className="dashboard-card">
            <h3>At Risk</h3>
            <strong className="risk-number">{atRiskCount}</strong>
            <p>Employees requiring attention</p>
          </div>

          <div className="dashboard-card">
            <h3>Average Workload</h3>
            <strong>{averageWorkload}/5</strong>
            <p>Across your team</p>
          </div>

          <div className="dashboard-card">
            <h3>Manager Support</h3>
            <strong>{averageSupport}/5</strong>
            <p>Team average</p>
          </div>
        </div>
      </section>

      {/* Employee Analytics */}
      <section className="dashboard-section">
        <h2>Employee Wellbeing</h2>

        <div className="table-card">
          <table className="wellness-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Responses</th>
                <th>Workload</th>
                <th>Manager Support</th>
                <th>Work-Life Balance</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employeeId}>
                  <td>Employee {employee.employeeId}</td>
                  <td>{employee.totalResponses}</td>
                  <td>{employee.averageWorkload}/5</td>
                  <td>{employee.averageManagerSupport}/5</td>
                  <td>{employee.averageWorkLifeBalance}/5</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Wellness Risks */}
      <section className="dashboard-section">
        <h2>Wellness Risks</h2>

        {risks.length === 0 ? (
          <div className="status-card healthy-card">
            <h3>All Clear</h3>
            <p>No employees are currently identified as at risk.</p>
          </div>
        ) : (
          <div className="risk-grid">
            {risks.map((risk) => (
              <div className="risk-card" key={risk.employeeId}>
                <div className="risk-header">
                  <h3>Employee {risk.employeeId}</h3>
                  <span className="risk-badge">
                    {risk.riskLevel}
                  </span>
                </div>

                <p>
                  <strong>Workload:</strong>{" "}
                  {risk.averageWorkload}/5
                </p>

                <p>
                  <strong>Manager Support:</strong>{" "}
                  {risk.averageManagerSupport}/5
                </p>

                <p>
                  <strong>Work-Life Balance:</strong>{" "}
                  {risk.averageWorkLifeBalance}/5
                </p>

                <div className="risk-reasons">
                  <strong>Reasons:</strong>

                  <ul>
                    {risk.reasons.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recommendations */}
      <section className="dashboard-section">
        <h2>Recommended Actions</h2>

        {recommendations.length === 0 ? (
          <div className="status-card healthy-card">
            <h3>No Immediate Actions</h3>
            <p>
              There are currently no specific recommendations for
              your team.
            </p>
          </div>
        ) : (
          <div className="recommendation-grid">
            {recommendations.map((item) => (
              <div
                className="recommendation-card"
                key={item.employeeId}
              >
                <h3>Employee {item.employeeId}</h3>

                <ul>
                  {item.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ManagerDashboard;