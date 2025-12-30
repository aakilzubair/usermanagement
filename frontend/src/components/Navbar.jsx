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

      {/* CENTER: DESKTOP LINKS */}
      <nav className="nav-center desktop-only">
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
        {/* DESKTOP USER INFO & LOGOUT */}
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
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          {/* Mobile Navigation Links */}
          <nav className="mobile-nav-links">
            {user.role === "admin" && (
              <>
                <NavLink 
                  to="/dashboard" 
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/admin/users" 
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Users
                </NavLink>
              </>
            )}

            {user.role === "user" && (
              <>
                <NavLink 
                  to="/profile" 
                  end 
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <NavLink 
                  to="/profile/edit" 
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Edit
                </NavLink>
              </>
            )}
          </nav>

          {/* Mobile User Info */}
          <div className="mobile-user">
            <strong>{user.fullName}</strong>
            <span>{user.role}</span>
          </div>

          {/* Mobile Logout */}
          <button
            className="logout-btn full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}