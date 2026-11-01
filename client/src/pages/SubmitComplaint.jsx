
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/complaints";

function SubmitComplaint() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Infrastructure",
    location: "",
    priority: "Medium",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = sessionStorage.getItem("campuscare_token");

      if (!token) {
        setError("Please log in before submitting a complaint.");
        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit complaint.");
      }

      setMessage("Complaint submitted successfully!");

      setFormData({
        title: "",
        description: "",
        category: "Infrastructure",
        location: "",
        priority: "Medium",
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="campuscare min-vh-100">
      <div className="container py-5">
        <div
          className="mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <div className="mb-4">
            <h1 className="fw-bold">Submit a Complaint</h1>
            <p className="text-secondary">
              Report a campus issue and let us help resolve it.
            </p>
          </div>

          <div className="preview-card p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Complaint Title
                </label>

                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="e.g. Projector not working"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Description
                </label>

                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  placeholder="Describe the issue..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Category
                </label>

                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Cleanliness">Cleanliness</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Internet">Internet</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="e.g. Classroom 204"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Priority
                </label>

                <select
                  name="priority"
                  className="form-select"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {message && (
                <div className="alert alert-success">
                  {message}
                </div>
              )}

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>
            </form>

            <div className="d-flex flex-wrap justify-content-between gap-2 mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>

              <Link
                to="/complaints"
                className="btn btn-outline-primary"
              >
                My Complaints
              </Link>

              <Link
                to="/"
                className="btn btn-outline-secondary"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SubmitComplaint;
