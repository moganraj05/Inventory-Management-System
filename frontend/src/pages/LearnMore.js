import { useNavigate, Link } from "react-router-dom";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* Background Blobs */}
      <div style={styles.blobLeft}></div>
      <div style={styles.blobRight}></div>

      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.logo}>Management Made Easier</div>
        <Link to="/register">
          <button style={styles.navButton}>Get Started</button>
        </Link>
      </div>

      {/* Hero Section */}
      <div style={styles.hero}>

        {/* Left Content */}
        <div style={styles.heroText}>
          <h1 style={styles.heading}>Inventory Management System</h1>
          <p style={styles.paragraph}>
            A structured enterprise-grade solution designed to manage products,
            suppliers, categories, and stock operations through a centralized,
            real-time, dashboard-driven platform.
          </p>

          <button
            style={styles.learnBtn}
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>

        {/* Right Modules Section */}
        <div style={styles.heroIllustration}>
          <div style={styles.moduleContainer}>

            {moduleCard("Dashboard Analytics",
              "Real-time operational visibility including product counts, supplier metrics, and stock alerts.")}

            {moduleCard("Product Management",
              "Complete product lifecycle management with structured categorization and supplier mapping.")}

            {moduleCard("Category Structuring",
              "Organized classification of inventory items for clarity and traceability.")}

            {moduleCard("Supplier Administration",
              "Centralized supplier records and procurement tracking.")}

            {moduleCard("Stock Monitoring",
              "Dynamic stock updates ensuring real-time accuracy.")}

            {moduleCard("Role-Based Access",
              "Secure administrative governance with controlled permissions.")}

          </div>
        </div>

      </div>
    </div>
  );
};

const moduleCard = (title, description) => (
  <div style={styles.card}>
    <div style={styles.cardAccent}></div>
    <h3 style={styles.cardTitle}>{title}</h3>
    <p style={styles.cardText}>{description}</p>
  </div>
);

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
    width: "40%"
  },

  heading: {
    fontSize: 42,
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
    display: "grid",
    gap: 20
  },

  moduleContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  },

  cardAccent: {
    height: "4px",
    width: "50px",
    background: "#f43f5e",
    borderRadius: "10px",
    marginBottom: "12px",
  },

  cardTitle: {
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#111827",
  },

  cardText: {
    fontSize: "13px",
    color: "#6b7280",
    lineHeight: "1.5",
  }
};

export default LearnMore;
