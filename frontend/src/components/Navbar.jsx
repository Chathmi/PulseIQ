import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Login</Link> |{" "}
      <Link to="/employee">Employee</Link> |{" "}
      <Link to="/manager">Manager</Link> |{" "}
      <Link to="/hr">HR</Link> |{" "}
      <Link to="/survey">Survey</Link>
    </nav>
  );
}

export default Navbar;