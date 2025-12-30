import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/admin/users?page=${page}`);

      setUsers(res.data.users);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 refetch when page changes
  useEffect(() => {
    fetchUsers();
  }, [page]);

  const updateStatus = async (id, action) => {
    const confirm = window.confirm(
      `Are you sure you want to ${action} this user?`
    );
    if (!confirm) return;

    await api.patch(`/admin/users/${id}/${action}`);
    fetchUsers();
  };

  if (loading) {
    return <div className="loading">Loading users…</div>;
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>Manage Users</h1>
        <p>Admin controls for user accounts</p>
      </div>

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th align="right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.serialNo}</td>
                <td className="name">{user.fullName}</td>
                <td className="email">{user.email}</td>
                <td className="role">{user.role}</td>
                <td>
                  <span className={`status-pill ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td align="right">
                  {user.status === "active" ? (
                    <button
                      className="btn danger"
                      onClick={() => updateStatus(user._id, "deactivate")}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn success"
                      onClick={() => updateStatus(user._id, "activate")}
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Controls */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span className="page-info">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
