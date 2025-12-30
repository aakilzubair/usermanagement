import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      {/* LEFT: LOGO */}
      <div className="nav-left">
        <span className="logo">UserMgmt</span>
      </div>

      {/* CENTER: LINKS */}
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

      {/* RIGHT SIDE */}
      <div className="nav-right">
        {/* DESKTOP USER INFO */}
        <div className="desktop-only user-info">
          <span className="user-name">{user.fullName}</span>
          <span className="user-role">{user.role}</span>
        </div>

        <button
          className="logout-btn desktop-only"
          onClick={handleLogout}
        >
          Logout
        </button>

        {/* MOBILE HAMBURGER */}
        <button
          className="hamburger mobile-only"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>

        {/* MOBILE DROPDOWN */}
        {menuOpen && (
          <div className="mobile-menu">
            <div className="mobile-user">
              <strong>{user.fullName}</strong>
              <span>{user.role}</span>
            </div>

            <button
              className="logout-btn full"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
