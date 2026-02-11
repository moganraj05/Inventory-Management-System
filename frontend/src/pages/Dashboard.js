import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AdminLayout from "../layouts/AdminLayout";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!data) {
    return (
      <AdminLayout>
        <div style={{ padding: 40, fontSize: 18 }}>Loading dashboard…</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="dashboard-container">

        {/* HEADER */}
        <h1 className="dashboard-title">Inventory Dashboard</h1>

        {/* INSIGHT BANNER */}
        <div className="insight-banner">
          📊 Today’s Insight: You have <b>{data.totalProducts}</b> products,
          <b> {data.lowStockCount}</b> items need attention.
        </div>

        {/* KPI CARDS (CLICKABLE) */}
        <div className="kpi-grid">
          <KpiCard
            title="Total Products"
            value={data.totalProducts}
            icon="📦"
            type="blue"
            onClick={() => navigate("/products")}
          />

          <KpiCard
            title="Categories"
            value={data.totalCategories}
            icon="🗂️"
            type="purple"
            onClick={() => navigate("/categories")}
          />

          <KpiCard
            title="Suppliers"
            value={data.totalSuppliers}
            icon="🚚"
            type="green"
            onClick={() => navigate("/suppliers")}
          />

         <KpiCard
  title="Low Stock"
  value={data.lowStockCount}
  icon="⚠️"
  type="red"
  onClick={() => navigate("/products?lowStock=true")}
/>

        </div>

        {/* MAIN GRID */}
        <div className="dashboard-grid">

          {/* STOCK CHART */}
          <div className="card">
            <h3>Stock Movement</h3>
            <p className="section-hint">Overview of inventory inflow and outflow</p>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data.stockSummary}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalQuantity" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* LOW STOCK TABLE */}
          <div className="card">
            <h3>Low Stock Products</h3>

            {data.lowStockProducts.length === 0 ? (
              <div className="empty-state">
                ✅ Inventory levels are healthy
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Min</th>
                  </tr>
                </thead>
                <tbody>
                  {data.lowStockProducts.map(p => (
                    <tr key={p._id} className="danger-row">
                      <td>{p.name}</td>
                      <td>{p.quantity}</td>
                      <td>{p.minStockLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="card">
          <h3>Recent Transactions</h3>

          {data.recentTransactions.length === 0 ? (
            <div className="empty-state">No recent transactions</div>
          ) : (
            <ul className="transaction-list">
              {data.recentTransactions.map((t, i) => (
                <li key={i} className={t.type === "OUT" ? "out" : "in"}>
                  <span>{t.product?.name}</span>
                  <span>{t.type}</span>
                  <span>{t.quantity}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>

      {/* CSS */}
      <style>{`
        .dashboard-container {
          padding: 20px;
          background: #f1f5f9;
          min-height: 100vh;
        }

        .dashboard-title {
          font-size: 28px;
          margin-bottom: 15px;
        }

        .insight-banner {
          background: #ecfeff;
          border-left: 6px solid #06b6d4;
          padding: 14px 18px;
          border-radius: 10px;
          margin-bottom: 25px;
          font-size: 15px;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 35px;
        }

        .kpi-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          border-radius: 16px;
          color: white;
          box-shadow: 0 15px 35px rgba(0,0,0,0.12);
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .kpi-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(0,0,0,0.18);
        }

        .kpi-icon {
          font-size: 34px;
          background: rgba(255,255,255,0.2);
          padding: 14px;
          border-radius: 12px;
        }

        .blue { background: linear-gradient(135deg, #2563eb, #1e40af); }
        .purple { background: linear-gradient(135deg, #7c3aed, #4c1d95); }
        .green { background: linear-gradient(135deg, #16a34a, #065f46); }
        .red { background: linear-gradient(135deg, #dc2626, #7f1d1d); }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 25px;
          margin-bottom: 30px;
        }

        .card {
          background: white;
          padding: 22px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        .section-hint {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 10px;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .table th, .table td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }

        .danger-row {
          color: #dc2626;
          font-weight: 500;
        }

        .empty-state {
          text-align: center;
          padding: 30px;
          color: #16a34a;
          font-weight: 500;
        }

        .transaction-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .transaction-list li {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          padding: 10px 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .transaction-list li.in {
          color: #16a34a;
        }

        .transaction-list li.out {
          color: #dc2626;
        }

        @media (max-width: 900px) {
          .kpi-grid {
            grid-template-columns: 1fr 1fr;
          }
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 500px) {
          .kpi-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AdminLayout>
  );
}

export default Dashboard;

/* KPI CARD COMPONENT */
function KpiCard({ title, value, icon, type, onClick }) {
  return (
    <div className={`kpi-card ${type}`} onClick={onClick}>
      <div className="kpi-icon">{icon}</div>
      <div>
        <p style={{ margin: 0, fontSize: 14 }}>{title}</p>
        <h2 style={{ margin: 0 }}>{value}</h2>
      </div>
    </div>
  );
}
