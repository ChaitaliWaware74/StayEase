// components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiPlusCircle, FiUser, FiLogOut, FiList } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="logo-section" onClick={() => navigate("/")}>
          <h2 className="logo">
  <FaHome style={{ marginRight: "5px" }} />
  StayEase
</h2>
        </div>

        <div className="nav-menu">
          {!token ? (
            <>
              <Link to="/login" className="nav-link">
                <FiUser /> Login
              </Link>
              <Link to="/register" className="nav-link register-btn">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">
                <FiHome /> Home
              </Link>
              <Link to="/add" className="nav-link">
                <FiPlusCircle /> Post Listing
              </Link>
              <Link to="/my-posts" className="nav-link">
                <FiList /> My Listings
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                <FiLogOut /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}