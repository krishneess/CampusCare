import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import {
  ShieldCheck,
  ClipboardList,
  Clock3,
  CheckCircle2,
  ArrowRight,
  Wifi,
  Building2,
  Lightbulb,
  Droplets,
  Wrench,
  Menu,
  Sun,
  Moon,
  UserCircle,
} from "lucide-react";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import SubmitComplaint from "./pages/SubmitComplaint.jsx";
import MyComplaints from "./pages/MyComplaints.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

import "./App.css";

const categories = [
  { name: "IT & Wi-Fi", icon: Wifi, color: "blue" },
  { name: "Classrooms", icon: Building2, color: "purple" },
  { name: "Electrical", icon: Lightbulb, color: "orange" },
  { name: "Water Supply", icon: Droplets, color: "cyan" },
  { name: "Maintenance", icon: Wrench, color: "green" },
];

function getSavedUser() {
  try {
    const savedUser = sessionStorage.getItem("campuscare_user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

function Home({ theme, toggleTheme, user, handleLogout }) {
  return (
    <div className="campuscare">
      <nav className="navbar navbar-expand-lg border-bottom py-3">
        <div className="container">
          <Link
            className="navbar-brand d-flex align-items-center gap-2"
            to="/"
          >
            <span className="brand-icon">
              <ShieldCheck size={24} />
            </span>
            <span className="fw-bold">CampusCare</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-label="Toggle navigation"
          >
            <Menu size={22} />
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <a className="nav-link active" href="#home">
                Home
              </a>

              <a className="nav-link" href="#categories">
                Categories
              </a>

              <a className="nav-link" href="#how-it-works">
                How it works
              </a>

              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-3"
                onClick={toggleTheme}
                aria-label={`Switch to ${
                  theme === "light" ? "dark" : "light"
                } mode`}
                title={`Switch to ${
                  theme === "light" ? "dark" : "light"
                } mode`}
              >
                {theme === "light" ? (
                  <Moon size={18} />
                ) : (
                  <Sun size={18} />
                )}

                <span className="ms-2">
                  {theme === "light" ? "Dark mode" : "Light mode"}
                </span>
              </button>

              {user ? (
                <>
                  <Link
                    className="btn btn-outline-primary rounded-pill px-4"
                    to="/complaints"
                  >
                    My Complaints
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      className="btn btn-outline-primary rounded-pill px-4"
                      to="/admin"
                    >
                      <ShieldCheck size={18} className="me-2" />
                      Admin Dashboard
                    </Link>
                  )}

                  <Link
                    className="btn btn-outline-primary rounded-pill px-4"
                    to="/profile"
                  >
                    <UserCircle size={18} className="me-2" />
                    {user.name}
                  </Link>

                  <button
                    type="button"
                    className="btn btn-primary rounded-pill px-4"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="btn btn-outline-primary rounded-pill px-4"
                    to="/login"
                  >
                    Log in
                  </Link>

                  <Link
                    className="btn btn-primary rounded-pill px-4"
                    to="/register"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero-section" id="home">
          <div className="container py-5">
            <div className="row align-items-center g-5 py-lg-5">
              <div className="col-lg-7">
                <div className="eyebrow mb-4">
                  <span className="status-dot" />
                  YOUR CAMPUS, BETTER EVERY DAY
                </div>

                <h1 className="hero-title">
                  A better campus
                  <br />
                  starts with <span>your voice.</span>
                </h1>

                <p className="hero-description mt-4">
                  Report campus issues, track their progress, and help
                  make your college a better place for everyone.
                </p>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  <Link
                    to={user ? "/complaints/new" : "/login"}
                    className="btn btn-primary btn-lg rounded-3 px-4"
                  >
                    Report an issue{" "}
                    <ArrowRight size={18} className="ms-2" />
                  </Link>

                  <a
                    href="#how-it-works"
                    className="btn btn-outline-secondary btn-lg rounded-3 px-4"
                  >
                    How it works
                  </a>
                </div>

                <div className="hero-trust mt-5">
                  <ShieldCheck size={19} />
                  <span>
                    Transparent reporting. Accountable resolution.
                  </span>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="preview-card">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                      <p className="text-secondary small mb-1">
                        CAMPUS OVERVIEW
                      </p>
                      <h5 className="fw-bold mb-0">Issue tracker</h5>
                    </div>

                    <span className="live-badge">
                      ● Live preview
                    </span>
                  </div>

                  <div className="row g-3">
                    <div className="col-6">
                      <div className="stat-card stat-blue">
                        <ClipboardList size={22} />
                        <h3>128</h3>
                        <p>Total reports</p>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="stat-card stat-orange">
                        <Clock3 size={22} />
                        <h3>24</h3>
                        <p>In progress</p>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="stat-card stat-purple">
                        <Clock3 size={22} />
                        <h3>12</h3>
                        <p>Awaiting assignment</p>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="stat-card stat-green">
                        <CheckCircle2 size={22} />
                        <h3>92</h3>
                        <p>Resolved</p>
                      </div>
                    </div>
                  </div>

                  <div className="preview-footer mt-4">
                    <span className="status-dot" />
                    Example dashboard preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="categories-section py-5" id="categories">
          <div className="container py-3">
            <div className="section-heading text-center mb-5">
              <p className="eyebrow">
                ONE PLACE FOR CAMPUS ISSUES
              </p>
              <h2>What can you report?</h2>
              <p>
                Choose a category to help the right team resolve
                your issue.
              </p>
            </div>

            <div className="row g-4">
              {categories.map(({ name, icon: Icon, color }) => (
                <div
                  className="col-6 col-md-4 col-lg"
                  key={name}
                >
                  <div className="category-card h-100">
                    <div className={`category-icon ${color}`}>
                      <Icon size={25} />
                    </div>
                    <h6>{name}</h6>
                    <p>Report an issue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="how-section py-5" id="how-it-works">
          <div className="container py-4">
            <div className="section-heading text-center mb-5">
              <p className="eyebrow">
                SIMPLE AND TRANSPARENT
              </p>
              <h2>From report to resolution</h2>
              <p>
                Three simple steps to make your campus better.
              </p>
            </div>

            <div className="row g-4">
              {[
                {
                  number: "01",
                  title: "Report the problem",
                  description:
                    "Describe the issue, choose a category, and tell us where it happened.",
                },
                {
                  number: "02",
                  title: "Track the progress",
                  description:
                    "The relevant department reviews your complaint and updates its status.",
                },
                {
                  number: "03",
                  title: "See the resolution",
                  description:
                    "Follow the updates and see when the issue has been resolved.",
                },
              ].map((step) => (
                <div className="col-md-4" key={step.number}>
                  <div className="step-card h-100">
                    <span className="step-number">
                      {step.number}
                    </span>
                    <h5>{step.title}</h5>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section py-5" id="report">
          <div className="container">
            <div className="cta-card text-center p-4 p-md-5">
              <h2>See something that needs fixing?</h2>
              <p>
                Every improvement starts with reporting the problem.
              </p>

              <Link
                to={user ? "/complaints/new" : "/register"}
                className="btn btn-light btn-lg rounded-3 px-4"
              >
                Get started{" "}
                <ArrowRight size={18} className="ms-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer py-4">
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
          <span className="fw-bold">CampusCare</span>
          <span>
            Making campus better, one report at a time.
          </span>
          <span>CampusCare Project · Web Technology</span>
        </div>
      </footer>
    </div>
  );
}

function Profile({ user }) {
  return (
    <main className="campuscare min-vh-100">
      <div className="container py-5">
        <section
          className="preview-card mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <div className="d-flex align-items-center gap-3 mb-4">
            <UserCircle size={40} />

            <div>
              <h1 className="h3 fw-bold mb-1">My Profile</h1>
              <p className="text-secondary mb-0">
                Your CampusCare account details
              </p>
            </div>
          </div>

          {user ? (
            <>
              <hr />

              <p>
                <strong>Name:</strong> {user.name}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Role:</strong> {user.role}
              </p>
            </>
          ) : (
            <p>
              You are not logged in. Please sign in to view your profile.
            </p>
          )}

          <Link
            to="/"
            className="btn btn-outline-primary rounded-pill px-4 mt-3"
          >
            Back to home
          </Link>
        </section>
      </div>
    </main>
  );
}

function AppContent({ theme, toggleTheme }) {
  const location = useLocation();
  const [user, setUser] = useState(getSavedUser);

  useEffect(() => {
    setUser(getSavedUser());
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("campuscare_token");
    sessionStorage.removeItem("campuscare_user");
    setUser(null);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            theme={theme}
            toggleTheme={toggleTheme}
            user={user}
            handleLogout={handleLogout}
          />
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/complaints/new"
        element={<SubmitComplaint />}
      />

      <Route
        path="/complaints"
        element={<MyComplaints />}
      />

      <Route
        path="/profile"
        element={<Profile user={user} />}
      />

      <Route
        path="/admin"
        element={<AdminDashboard />}
      />

      <Route
        path="*"
        element={
          <Home
            theme={theme}
            toggleTheme={toggleTheme}
            user={user}
            handleLogout={handleLogout}
          />
        }
      />
    </Routes>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("campuscare-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("campuscare-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "light" ? "dark" : "light"
    );
  };

  return (
    <BrowserRouter>
      <AppContent
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </BrowserRouter>
  );
}

export default App;