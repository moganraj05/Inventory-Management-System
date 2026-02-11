import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ open, toggleSidebar }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* HAMBURGER ICON */}
     <div
  className={`hamburger ${open ? "hamburger-open" : "hamburger-closed"}`}
  onClick={toggleSidebar}
>
        <span />
        <span />
        <span />
      </div>

      {/* SIDEBAR */}
      <aside className={`sidebar ${open ? "open" : "closed"}`}>
        <h2 className="logo">Inventory</h2>

        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/suppliers">Suppliers</NavLink>
          <NavLink to="/stock">Stock</NavLink>
        </nav>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
