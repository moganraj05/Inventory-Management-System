import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "../layouts/AdminLayout";

function Stock() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [form, setForm] = useState({
    productId: "",
    supplierId: "",
    quantity: "",
    type: "IN"
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [pRes, sRes, tRes] = await Promise.all([
      api.get("/products"),
      api.get("/suppliers"),
      api.get("/stock")
    ]);

    setProducts(pRes.data);
    setSuppliers(sRes.data);
    setTransactions(tRes.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.type === "IN") {
      await api.post("/stock/in", {
        productId: form.productId,
        supplierId: form.supplierId,
        quantity: Number(form.quantity)
      });
    } else {
      await api.post("/stock/out", {
        productId: form.productId,
        quantity: Number(form.quantity)
      });
    }

    setForm({
      productId: "",
      supplierId: "",
      quantity: "",
      type: "IN"
    });

    fetchAll();
  };

  return (
    <AdminLayout>
      <div className="stock-container">

        {/* HEADER */}
        <h1 className="page-title">Stock Management</h1>
        <p className="page-subtitle">
          Control inventory movement, stock inflow and outflow
        </p>

        {/* GRID */}
        <div className="stock-grid">

          <div className="card stock-form-card">
            <h3>Stock In / Stock Out</h3>

            <form className="stock-form" onSubmit={handleSubmit}>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="IN">Stock IN</option>
                <option value="OUT">Stock OUT</option>
              </select>

              <select
                name="productId"
                value={form.productId}
                onChange={handleChange}
                required
              >
                <option value="">Select Product</option>
                {products.map(p => (
                  <option key={p._id} value={p._id}>
                    {p.name} (Qty: {p.quantity})
                  </option>
                ))}
              </select>

              {form.type === "IN" && (
                <select
                  name="supplierId"
                  value={form.supplierId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map(s => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              )}

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={form.quantity}
                onChange={handleChange}
                required
              />

              <button className="primary-btn" type="submit">
                {form.type === "IN" ? "Add Stock" : "Remove Stock"}
              </button>
            </form>
          </div>

          {/* RIGHT: TRANSACTION TABLE (SCROLLABLE) */}
          <div className="card stock-table-card">
            <h3>Stock Transactions</h3>

            {transactions.length === 0 ? (
              <div className="empty-state">
                📉 No stock movements recorded yet
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Supplier</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(t => (
                    <tr
                      key={t._id}
                      className={t.type === "OUT" ? "out-row" : "in-row"}
                    >
                      <td>{t.type}</td>
                      <td className="name-cell">{t.product?.name}</td>
                      <td>{t.quantity}</td>
                      <td>{t.supplier?.name || "—"}</td>
                      <td>{new Date(t.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>

      {/* UPDATED CSS */}
      <style>{`
        .stock-container {
          padding: 20px;
          background: #f1f5f9;
          min-height: calc(100vh - 70px);
        }

        .page-title {
          font-size: 28px;
          margin-bottom: 4px;
        }

        .page-subtitle {
          color: #6b7280;
          margin-bottom: 25px;
        }

        .stock-grid {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 25px;
          height: calc(100vh - 160px);
        }

        .card {
          background: white;
          padding: 22px;
          border-radius: 18px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        /* LEFT FORM FIX */
        .stock-form-card {
          align-self: flex-start;
          height: fit-content;
          position: sticky;
          top: 20px;
        }

        .stock-form {
          display: grid;
          gap: 14px;
        }

        .stock-form select,
        .stock-form input {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          font-size: 14px;
        }

        .primary-btn {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: white;
          border: none;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
        }

        /* RIGHT TABLE SCROLL */
        .stock-table-card {
          overflow-y: auto;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .table th,
        .table td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
          text-align: left;
        }

        .name-cell {
          font-weight: 600;
        }

        .in-row {
          color: #16a34a;
          font-weight: 500;
        }

        .out-row {
          color: #dc2626;
          font-weight: 500;
        }

        .empty-state {
          text-align: center;
          padding: 30px;
          color: #16a34a;
          font-weight: 500;
        }

        @media (max-width: 950px) {
          .stock-grid {
            grid-template-columns: 1fr;
            height: auto;
          }

          .stock-table-card {
            overflow: visible;
          }

          .stock-form-card {
            position: static;
          }
        }
      `}</style>
    </AdminLayout>
  );
}

export default Stock;
