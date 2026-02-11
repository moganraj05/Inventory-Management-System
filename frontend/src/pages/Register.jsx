import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      navigate("/");
    } catch {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* BLOBS */}
      <div style={styles.blobLeft}></div>
      <div style={styles.blobRight}></div>

      {/* NAVBAR */}
      <div style={styles.navbar}>
        <div style={styles.logo}>YOUR WEBSITE</div>
        <div>
          <Link to="/">
            <button style={styles.navButton}>Sign In</button>
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroText}>
          <h1 style={styles.heading}>Create Account</h1>
          <p style={styles.paragraph}>
            Register to manage products, control stock levels and monitor
            inventory efficiently.
          </p>
        </div>

        <div style={styles.heroIllustration}>
          <div style={styles.illustrationBox}>
            <div style={styles.formContainer}>
              <h3 style={styles.formTitle}>Register</h3>

              {error && <div style={styles.error}>{error}</div>}

              <form onSubmit={handleRegister} style={styles.form}>
                <input
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

                <select
                  name="role"
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>

                <button
                  type="submit"
                  style={styles.primaryBtn}
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </form>

              <div style={styles.switch}>
                Already have an account?{" "}
                <Link to="/" style={styles.link}>
                  Sign In
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f3ff",
    fontFamily: '"Segoe UI", system-ui, sans-serif',
    position: "relative",
    overflowX: "hidden"
  },

  blobLeft: {
    position: "fixed",
    width: 600,
    height: 600,
    background: "#f43f5e",
    borderRadius: "50%",
    top: -250,
    left: -250,
    zIndex: 0
  },

  blobRight: {
    position: "fixed",
    width: 700,
    height: 700,
    background: "#0f172a",
    borderRadius: "50%",
    bottom: -350,
    right: -350,
    zIndex: 0
  },

  navbar: {
    width: "100%",
    padding: "30px 70px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    zIndex: 2
  },

  logo: {
    fontWeight: 700,
    fontStyle: "italic",
    color: "#0f172a"
  },

  navButton: {
    background: "#0f172a",
    color: "#fff",
    border: "none",
    padding: "10px 22px",
    borderRadius: 30,
    cursor: "pointer",
    fontSize: 14
  },

  hero: {
    width: "90%",
    margin: "30px auto",
    background: "#ffffff",
    borderRadius: 22,
    padding: "60px 70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 25px 60px rgba(0,0,0,0.1)",
    position: "relative",
    zIndex: 2
  },

  heroText: {
    width: "45%"
  },

  heading: {
    fontSize: 48,
    color: "#0f172a",
    marginBottom: 20
  },

  paragraph: {
    color: "#6b7280",
    fontSize: 16,
    lineHeight: 1.6,
    marginBottom: 30
  },

  heroIllustration: {
    width: "55%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  illustrationBox: {
    width: 420,
    minHeight: 380,
    background: "linear-gradient(145deg,#0f172a,#1e293b)",
    borderRadius: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 20px 50px rgba(15,23,42,0.35)",
    color: "#ffffff"
  },

  formContainer: {
    width: "80%"
  },

  formTitle: {
    marginBottom: 20
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 8,
    border: "none",
    fontSize: 14
  },

  primaryBtn: {
    width: "100%",
    padding: 12,
    background: "#f43f5e",
    color: "#fff",
    border: "none",
    borderRadius: 30,
    fontSize: 14,
    cursor: "pointer",
    marginTop: 8
  },

  switch: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 13,
    color: "#cbd5e1"
  },

  link: {
    color: "#f43f5e",
    textDecoration: "none",
    fontWeight: 500
  },

  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: 8,
    borderRadius: 6,
    fontSize: 13,
    marginBottom: 12,
    textAlign: "center"
  }
};
