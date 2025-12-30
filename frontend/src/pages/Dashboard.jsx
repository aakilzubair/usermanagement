import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      fetchStats();
    }
  }, [user]);

  if (loading) {
    return <div className="loading">Loading dashboard…</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user.fullName}</h1>
        <p>Admin Dashboard</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Users</span>
          <span className="stat-value">{stats.total}</span>
        </div>

        <div className="stat-card stat-active">
          <span className="stat-label">Active Users</span>
          <span className="stat-value">{stats.active}</span>
        </div>

        <div className="stat-card stat-inactive">
          <span className="stat-label">Inactive Users</span>
          <span className="stat-value">{stats.inactive}</span>
        </div>
      </div>
    </div>
  );
}
