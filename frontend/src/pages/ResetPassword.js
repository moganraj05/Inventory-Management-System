import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await api.post(`/auth/reset-password/${token}`, {
        password
      });

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired token");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.blobLeft}></div>
      <div style={styles.blobRight}></div>

      <div style={styles.navbar}>
        <div style={styles.logo}>YOUR WEBSITE</div>
      </div>

      <div style={styles.hero}>
        <div style={styles.heroText}>
          <h1 style={styles.heading}>Reset Password</h1>
          <p style={styles.paragraph}>
            Enter your new password below to regain access.
          </p>
        </div>

        <div style={styles.heroIllustration}>
          <div style={styles.illustrationBox}>
            <div style={styles.loginContent}>
              <h3 style={styles.formTitle}>New Password</h3>

              {error && <div style={styles.error}>{error}</div>}
              {message && <div style={styles.success}>{message}</div>}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 15, position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                  />
                  <span
                    style={styles.show}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>

                <button type="submit" style={styles.primaryBtn}>
                  Reset Password
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

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

  formTitle: {
    marginBottom: 15
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
    marginTop: 5
  },

  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: 8,
    borderRadius: 6,
    fontSize: 13,
    marginBottom: 12,
    textAlign: "center"
  },

  success: {
    background: "#dcfce7",
    color: "#166534",
    padding: 8,
    borderRadius: 6,
    fontSize: 13,
    marginBottom: 12,
    textAlign: "center"
  }
};
