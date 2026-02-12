import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "../layouts/AdminLayout";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const res = await api.get("/suppliers");
    setSuppliers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await api.put(`/suppliers/${editId}`, form);
    } else {
      await api.post("/suppliers", form);
    }

    resetForm();
    fetchSuppliers();
  };

  const handleEdit = (s) => {
    setEditId(s._id);
    setForm({
      name: s.name,
      email: s.email,
      phone: s.phone,
      address: s.address || ""
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this supplier?")) {
      await api.delete(`/suppliers/${id}`);
      fetchSuppliers();
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", address: "" });
    setEditId(null);
  };

  return (
    <AdminLayout>
      <div className="supplier-container">

        <h1 className="page-title">Supplier Management</h1>
        <p className="page-subtitle">
          Manage vendor information and supplier relationships
        </p>

        {/* GRID */}
        <div className="supplier-grid">

          {/* LEFT: FORM (FIXED HEIGHT) */}
          <div className="card supplier-form-card">
            <h3>{editId ? "Edit Supplier" : "Add New Supplier"}</h3>

            <form className="supplier-form" onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Supplier Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <textarea
                name="address"
                placeholder="Address (optional)"
                value={form.address}
                onChange={handleChange}
                rows="3"
              />

              <div className="form-actions">
                <button className="primary-btn" type="submit">
                  {editId ? "Update Supplier" : "Add Supplier"}
                </button>

                {editId && (
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* RIGHT: TABLE (SCROLLABLE) */}
          <div className="card supplier-table-card">
            <h3>Supplier List</h3>

            {suppliers.length === 0 ? (
              <div className="empty-state">
                🚚 No suppliers added yet
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((s) => (
                    <tr key={s._id}>
                      <td className="name-cell">{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.phone}</td>
                      <td className="address-cell">
                        {s.address || "—"}
                      </td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(s)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(s._id)}
                        >
                          Delete
                        </button>
                      </td>
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
        .supplier-container {
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

        .supplier-grid {
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
        .supplier-form-card {
          align-self: flex-start;
          height: fit-content;
          position: sticky;
          top: 20px;
        }

        .supplier-form {
          display: grid;
          gap: 14px;
        }

        .supplier-form input,
        .supplier-form textarea {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          font-size: 14px;
        }

        .form-actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .primary-btn {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: white;
          border: none;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
        }

        .secondary-btn {
          background: #6b7280;
          color: white;
          border: none;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
        }

        /* RIGHT TABLE SCROLL */
        .supplier-table-card {
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

        .address-cell {
          color: #6b7280;
        }

        .edit-btn {
          background: #2563eb;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 8px;
          margin-right: 6px;
          cursor: pointer;
        }

        .delete-btn {
          background: #dc2626;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 8px;
          cursor: pointer;
        }

        .empty-state {
          text-align: center;
          padding: 30px;
          color: #16a34a;
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .supplier-grid {
            grid-template-columns: 1fr;
            height: auto;
          }

          .supplier-table-card {
            overflow: visible;
          }

          .supplier-form-card {
            position: static;
          }
        }
      `}</style>
    </AdminLayout>
  );
}

export default Suppliers;
