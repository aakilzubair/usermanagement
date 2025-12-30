import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <span className="logo">UserMgmt</span>
      </div>

      {/* CENTER */}
      <nav className="nav-center">
        {user.role === "admin" && (
          <>
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
            <NavLink to="/admin/users" className="nav-link">
              Users
            </NavLink>
          </>
        )}

        {user.role === "user" && (
          <>
            <NavLink to="/profile" end className="nav-link">
              Profile
            </NavLink>

            <NavLink to="/profile/edit" className="nav-link">
              Edit
            </NavLink>
          </>
        )}
      </nav>

      {/* RIGHT */}
      <div className="nav-right">
        <div className="user-info">
          <span className="user-name">{user.fullName}</span>
          <span className="user-role">{user.role}</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
