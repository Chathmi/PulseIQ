import { useState } from "react";

function Survey() {
  const [formData, setFormData] = useState({
    employeeId: "",
    workload: "",
    managerSupport: "",
    workLifeBalance: "",
    comment: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.employeeId ||
      !formData.workload ||
      !formData.managerSupport ||
      !formData.workLifeBalance ||
      !formData.comment
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    setMessage("Survey submitted successfully!");

    setFormData({
      employeeId: "",
      workload: "",
      managerSupport: "",
      workLifeBalance: "",
      comment: "",
    });
  };

  return (
    <div>
      <h1>Employee Wellness Survey</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="employeeId"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="number"
          name="workload"
          placeholder="Workload (1-5)"
          value={formData.workload}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="number"
          name="managerSupport"
          placeholder="Manager Support (1-5)"
          value={formData.managerSupport}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="number"
          name="workLifeBalance"
          placeholder="Work-Life Balance (1-5)"
          value={formData.workLifeBalance}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="comment"
          placeholder="Comments"
          value={formData.comment}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Submit Survey</button>
      </form>
    </div>
  );
}

export default Survey;