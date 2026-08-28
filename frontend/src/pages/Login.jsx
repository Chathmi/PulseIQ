import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState("");
  const [role, setRole] = useState("employee");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!employeeId) {
      return;
    }

    if (role === "employee") {
      navigate("/employee");
    } else if (role === "manager") {
      navigate("/manager");
    } else if (role === "hr") {
      navigate("/hr");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">P</div>
          <h1>PulseIQ</h1>
          <p>Workplace Culture & Wellness Intelligence</p>
        </div>

        <form onSubmit={handleLogin}>
          <label htmlFor="employeeId">Employee ID</label>

          <input
            id="employeeId"
            type="number"
            placeholder="Enter your employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />

          <label htmlFor="role">Role</label>

          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="hr">HR</option>
          </select>

          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;