import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        PulseIQ
      </Link>

      <div className="navbar-links">
        <Link to="/employee">Employee</Link>
        <Link to="/manager">Manager</Link>
        <Link to="/hr">HR</Link>
        <Link to="/survey">Survey</Link>
      </div>
    </nav>
  );
}

export default Navbar;