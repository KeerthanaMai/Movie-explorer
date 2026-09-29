import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Movie Explorer
      </Link>

      <Link to="/" className="home-link">
        Home
      </Link>
    </nav>
  );
}

export default Navbar;