import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ClipboardList,
  Clock3,
  CheckCircle2,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";

const API = "http://localhost:5000/api/complaints";

const statuses = ["Submitted", "In Progress", "Resolved", "Rejected"];

function AdminDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const user = JSON.parse(
    sessionStorage.getItem("campuscare_user") || "null"
  );

  const token = sessionStorage.getItem("campuscare_token");

  const fetchComplaints = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API}/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load complaints.");
      }

      const complaintList = Array.isArray(data)
        ? data
        : data.complaints || [];

      setComplaints(complaintList);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      navigate("/login");
      return;
    }

    fetchComplaints();
  }, []);

  const updateAssignment = async (complaintId, isAssigned) => {
    setUpdatingId(complaintId);
    setError("");

    try {
      const response = await fetch(`${API}/admin/${complaintId}/assign`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isAssigned }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update assignment.");
      }

      await fetchComplaints();
    } catch (err) {
      setError(err.message || "Assignment update failed.");
    } finally {
      setUpdatingId("");
    }
  };

  const updateStatus = async (complaintId, status) => {
    setUpdatingId(complaintId);
    setError("");

    try {
      const response = await fetch(`${API}/admin/${complaintId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update status.");
      }

      await fetchComplaints();
    } catch (err) {
      setError(err.message || "Status update failed.");
    } finally {
      setUpdatingId("");
    }
  };

  const total = complaints.length;

  const submitted = complaints.filter(
    (item) => item.status === "Submitted"
  ).length;

  const inProgress = complaints.filter(
    (item) => item.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  return (
    <main className="campuscare min-vh-100">
      <div className="container py-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <ShieldCheck size={25} />
              <span className="fw-bold">CampusCare Admin</span>
            </div>

            <h1 className="fw-bold mb-1">Admin Dashboard</h1>

            <p className="text-secondary mb-0">
              Review and manage campus complaints.
            </p>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary rounded-pill"
              onClick={fetchComplaints}
              disabled={loading}
            >
              <RefreshCw size={16} className="me-2" />
              Refresh
            </button>

            <Link
              to="/"
              className="btn btn-outline-secondary rounded-pill"
            >
              <ArrowLeft size={16} className="me-2" />
              Home
            </Link>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row g-3 mb-4">
          <div className="col-6 col-lg-3">
            <div className="preview-card h-100">
              <ClipboardList size={23} />
              <h2 className="fw-bold mt-3">{total}</h2>
              <p className="text-secondary mb-0">Total complaints</p>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="preview-card h-100">
              <Clock3 size={23} />
              <h2 className="fw-bold mt-3">{submitted}</h2>
              <p className="text-secondary mb-0">Submitted</p>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="preview-card h-100">
              <RefreshCw size={23} />
              <h2 className="fw-bold mt-3">{inProgress}</h2>
              <p className="text-secondary mb-0">In progress</p>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="preview-card h-100">
              <CheckCircle2 size={23} />
              <h2 className="fw-bold mt-3">{resolved}</h2>
              <p className="text-secondary mb-0">Resolved</p>
            </div>
          </div>
        </div>

        <section className="preview-card">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
            <div>
              <h2 className="h4 fw-bold mb-1">All complaints</h2>

              <p className="text-secondary mb-0">
                Review submissions, assign complaints, and update their status.
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-secondary">Loading complaints...</p>
          ) : complaints.length === 0 ? (
            <p className="text-secondary">
              No complaints have been submitted yet.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Complaint</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Submitted by</th>
                    <th>Priority</th>
                    <th>Assignment</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint._id}>
                      <td style={{ minWidth: "220px" }}>
                        <strong>{complaint.title}</strong>

                        <div className="small text-secondary mt-1">
                          {complaint.description}
                        </div>
                      </td>

                      <td>{complaint.category}</td>

                      <td>{complaint.location}</td>

                      <td>
                        {complaint.submittedBy?.name || "Unknown"}

                        <div className="small text-secondary">
                          {complaint.submittedBy?.email || ""}
                        </div>
                      </td>

                      <td>{complaint.priority}</td>

                      <td style={{ minWidth: "150px" }}>
                        <select
                          className="form-select"
                          value={String(complaint.isAssigned ?? false)}
                          disabled={updatingId === complaint._id}
                          onChange={(event) =>
                            updateAssignment(
                              complaint._id,
                              event.target.value === "true"
                            )
                          }
                        >
                          <option value="false">Unassigned</option>
                          <option value="true">Assigned</option>
                        </select>
                      </td>

                      <td style={{ minWidth: "170px" }}>
                        <select
                          className="form-select"
                          value={complaint.status}
                          disabled={updatingId === complaint._id}
                          onChange={(event) =>
                            updateStatus(
                              complaint._id,
                              event.target.value
                            )
                          }
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>

                        {updatingId === complaint._id && (
                          <small className="text-secondary">
                            Updating...
                          </small>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;