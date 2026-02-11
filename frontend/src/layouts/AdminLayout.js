import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../components/Sidebar.css";

function AdminLayout({ children }) {
  // Sidebar OPEN by default after login
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main className={`admin-content ${sidebarOpen ? "shift" : ""}`}>
        {children}
      </main>
    </>
  );
}

export default AdminLayout;
