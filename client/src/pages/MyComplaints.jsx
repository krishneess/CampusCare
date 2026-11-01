import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/complaints/my";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = sessionStorage.getItem("campuscare_token");

        if (!token) {
          setError("Please log in to view your complaints.");
          return;
        }

        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load complaints.");
        }

        setComplaints(data.complaints || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Resolved":
        return "status-resolved";
      case "In Progress":
        return "status-progress";
      case "Rejected":
        return "status-rejected";
      default:
        return "status-submitted";
    }
  };

  return (
    <main className="campuscare min-vh-100">
      <div className="container py-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div>
            <p className="eyebrow mb-2">YOUR REPORTS</p>
            <h1 className="fw-bold mb-2">My Complaints</h1>
            <p className="text-secondary mb-0">
              View your reported issues and track their progress.
            </p>
          </div>

          <Link
            to="/complaints/new"
            className="btn btn-primary rounded-pill px-4"
          >
            + Report an issue
          </Link>
        </div>

        {loading && (
          <div className="preview-card text-center p-5">
            <div className="spinner-border text-primary mb-3" />
            <p className="text-secondary mb-0">
              Loading your complaints...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && complaints.length === 0 && (
          <div className="preview-card text-center p-5">
            <h4 className="fw-bold">No complaints yet</h4>
            <p className="text-secondary">
              You haven’t submitted any complaints. Report an issue to get
              started.
            </p>
            <Link
              to="/complaints/new"
              className="btn btn-primary rounded-pill px-4"
            >
              Submit your first complaint
            </Link>
          </div>
        )}

        {!loading && !error && complaints.length > 0 && (
          <div className="row g-4">
            {complaints.map((complaint) => (
              <div className="col-12" key={complaint._id}>
                <article className="preview-card p-4">
                  <div className="d-flex flex-wrap justify-content-between gap-3">
                    <div>
                      <h5 className="fw-bold mb-2">
                        {complaint.title}
                      </h5>

                      <p className="text-secondary mb-2">
                        {complaint.description}
                      </p>
                    </div>

                    <span
                      className={`complaint-status ${getStatusClass(
                        complaint.status
                      )}`}
                    >
                      {complaint.status || "Submitted"}
                    </span>
                  </div>

                  <hr />

                  <div className="row g-3">
                    <div className="col-sm-6 col-lg-3">
                      <small className="text-secondary d-block">
                        Category
                      </small>
                      <strong>{complaint.category}</strong>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <small className="text-secondary d-block">
                        Location
                      </small>
                      <strong>{complaint.location}</strong>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <small className="text-secondary d-block">
                        Priority
                      </small>
                      <strong>{complaint.priority || "Medium"}</strong>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <small className="text-secondary d-block">
                        Submitted on
                      </small>
                      <strong>
                        {complaint.createdAt
                          ? new Date(
                              complaint.createdAt
                            ).toLocaleDateString()
                          : "—"}
                      </strong>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}

        <Link
          to="/"
          className="btn btn-outline-secondary rounded-pill px-4 mt-4"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}

export default MyComplaints;