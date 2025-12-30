import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    };
    loadProfile();
  }, []);

  if (!user) {
    return <div className="loading">Loading profile…</div>;
  }

  return (
    <div className="profile-page">
      <h1 className="profile-title">My Profile</h1>

      <div className="profile-card">
        <div className="profile-row">
          <span className="label">Full Name</span>
          <span className="value">{user.fullName}</span>
        </div>

        <div className="profile-row">
          <span className="label">Email</span>
          <span className="value">{user.email}</span>
        </div>

        <div className="profile-row">
          <span className="label">Role</span>
          <span className="value role">{user.role}</span>
        </div>

        <div className="profile-row">
          <span className="label">Joined</span>
          <span className="value">
            {new Date(user.createdAt).toDateString()}
          </span>
        </div>

        <div className="profile-row">
          <span className="label">Last Updated</span>
          <span className="value">
            {new Date(user.updatedAt).toDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
