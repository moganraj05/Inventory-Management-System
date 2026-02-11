import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* BACKGROUND BLOBS */}
      <div style={styles.blobLeft}></div>
      <div style={styles.blobRight}></div>

      {/* NAVBAR */}
      <div style={styles.navbar}>
        <div style={styles.logo}>YOUR WEBSITE</div>
        <div>
          <Link to="/register">
            <button style={styles.navButton}>Get Started</button>
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroText}>
          <h1 style={styles.heading}>Inventory Management</h1>
          <p style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed eget libero feugiat, faucibus libero id, scelerisque quam.
          </p>
          <button style={styles.learnBtn}>Learn More</button>
        </div>

        <div style={styles.heroIllustration}>
          <div style={styles.illustrationBox}>
            {/* LOGIN FORM */}
            <div style={styles.loginContent}>
              <h3 style={{ marginBottom: 15 }}>Sign In</h3>

              {error && <div style={styles.error}>{error}</div>}

              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: 15 }}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={{ marginBottom: 15, position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                  <span
                    style={styles.show}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>

                <button
                  type="submit"
                  style={styles.primaryBtn}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Access Dashboard"}
                </button>
              </form>

              {/* CREATE ACCOUNT BELOW BUTTON */}
              <div style={styles.createAccount}>
                Don’t have an account?{" "}
                <Link to="/register" style={styles.createLink}>
                  Create Account
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

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

  learnBtn: {
    background: "#0f172a",
    color: "#ffffff",
    border: "none",
    padding: "14px 32px",
    borderRadius: 30,
    fontSize: 15,
    cursor: "pointer"
  },

  heroIllustration: {
    width: "55%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  illustrationBox: {
    width: 420,
    height: 320,
    background: "linear-gradient(145deg,#0f172a,#1e293b)",
    borderRadius: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    boxShadow: "0 20px 50px rgba(15,23,42,0.35)"
  },

  loginContent: {
    width: "80%"
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "none",
    fontSize: 14
  },

  show: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 12,
    color: "#f43f5e",
    cursor: "pointer"
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
    marginBottom: 15
  },

  createAccount: {
    textAlign: "center",
    fontSize: 13,
    color: "#cbd5e1"
  },

  createLink: {
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
