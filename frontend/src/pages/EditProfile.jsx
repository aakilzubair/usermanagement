import { useEffect, useState } from "react";
import api from "../api/axios";

export default function EditProfile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [newFullName, setNewFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/auth/me");
      setFullName(res.data.user.fullName);
      setEmail(res.data.user.email);
    };
    load();
  }, []);

  const updateName = async () => {
    try {
      await api.put("/auth/update-profile", {
        fullName: newFullName,
        email,
      });
      setMsg("Name updated successfully");
      setFullName(newFullName);
      setNewFullName("");
    } catch {
      setErr("Failed to update name");
    }
  };

  const updateEmail = async () => {
    try {
      await api.put("/auth/update-profile", {
        fullName,
        email: newEmail,
      });
      setMsg("Email updated successfully");
      setEmail(newEmail);
      setNewEmail("");
    } catch {
      setErr("Failed to update email");
    }
  };

  const changePassword = async () => {
    try {
      await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      setMsg("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch {
      setErr("Failed to change password");
    }
  };

  return (
    <div className="edit-profile">
      <h1>Edit Profile</h1>

      {msg && <div className="alert success">{msg}</div>}
      {err && <div className="alert error">{err}</div>}

      <div className="edit-grid">
        <div className="edit-card">
          <h3>Update Name</h3>
          <input
            placeholder="New full name"
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
          />
          <button className="btn primary" onClick={updateName}>
            Save Name
          </button>
        </div>

        <div className="edit-card">
          <h3>Update Email</h3>
          <input
            placeholder="New email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button className="btn primary" onClick={updateEmail}>
            Save Email
          </button>
        </div>

        <div className="edit-card full">
          <h3>Change Password</h3>
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="btn danger" onClick={changePassword}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
