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
    <div style={styles.layout}>
      {/* LEFT BRAND PANEL */}
      <div style={styles.left}>
        <h1 style={styles.brand}>Inventory Admin</h1>
        <p style={styles.tagline}>Inventory management system</p>
      </div>

      {/* RIGHT FORM PANEL */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.formTitle}>Sign in</h2>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleLogin}>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrap}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
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
            </div>

            <button type="submit" style={styles.primaryBtn} disabled={loading}>
              {loading ? "Signing in..." : "Access dashboard"}
            </button>
          </form>

          <p style={styles.switch}>
            Don’t have an account?{" "}
            <Link to="/register" style={styles.link}>
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
const styles = {
  layout: {
    minHeight: "100vh",
    display: "flex",
    fontFamily: "system-ui, -apple-system, sans-serif"
  },

  left: {
    flex: 1,
    background: "linear-gradient(180deg, #020617, #0f172a)",
    color: "#e5e7eb",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 80
  },

  brand: {
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 10
  },

  tagline: {
    fontSize: 14,
    color: "#94a3b8"
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8fafc"
  },

  card: {
    width: 380,
    background: "#ffffff",
    padding: 32,
    borderRadius: 10,
    boxShadow: "0 25px 40px rgba(0,0,0,0.15)"
  },

  formTitle: {
    marginBottom: 24,
    fontSize: 20,
    color: "#020617"
  },

  field: {
    marginBottom: 16
  },

  label: {
    display: "block",
    marginBottom: 6,
    fontSize: 13,
    color: "#475569"
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #cbd5f5",
    fontSize: 14,
    outline: "none"
  },

  passwordWrap: {
    position: "relative"
  },

  show: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 12,
    color: "#2563eb",
    cursor: "pointer"
  },

  primaryBtn: {
    width: "100%",
    padding: 12,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 14,
    cursor: "pointer",
    marginTop: 10
  },

  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: 10,
    borderRadius: 6,
    fontSize: 13,
    marginBottom: 16,
    textAlign: "center"
  },

  switch: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 13,
    color: "#475569"
  },

  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 500
  }
};
