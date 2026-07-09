function Survey() {
  return (
    <div>
      <h1>Employee Wellness Survey</h1>

      <form>
        <input
          type="number"
          placeholder="Employee ID"
        />

        <br /><br />

        <input
          type="number"
          placeholder="Workload (1-5)"
        />

        <br /><br />

        <input
          type="number"
          placeholder="Manager Support (1-5)"
        />

        <br /><br />

        <input
          type="number"
          placeholder="Work-Life Balance (1-5)"
        />

        <br /><br />

        <textarea
          placeholder="Comments"
        ></textarea>

        <br /><br />

        <button type="submit">
          Submit Survey
        </button>
      </form>
    </div>
  );
}

export default Survey;