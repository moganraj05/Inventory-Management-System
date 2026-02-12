import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "../layouts/AdminLayout";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (editId) {
      await api.put(`/categories/${editId}`, { name, description });
    } else {
      await api.post("/categories", { name, description });
    }

    resetForm();
    fetchCategories();
  };

  const editCategory = (cat) => {
    setEditId(cat._id);
    setName(cat.name);
    setDescription(cat.description || "");
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Delete this category?")) {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditId(null);
  };

  return (
    <AdminLayout>
      <div className="category-container">

        {/* HEADER */}
        <h1 className="page-title">Category Management</h1>
        <p className="page-subtitle">
          Organize your inventory with structured product categories
        </p>

        {/* GRID */}
        <div className="category-grid">

         
          <div className="card category-form-card">
            <h3>{editId ? "Edit Category" : "Add New Category"}</h3>

            <form onSubmit={submitHandler} className="category-form">
              <input
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
              />

              <div className="form-actions">
                <button type="submit" className="primary-btn">
                  {editId ? "Update Category" : "Add Category"}
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
          <div className="card category-table-card">
            <h3>Existing Categories</h3>

            {categories.length === 0 ? (
              <div className="empty-state">
                📂 No categories created yet
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat._id}>
                      <td className="name-cell">{cat.name}</td>
                      <td className="desc-cell">
                        {cat.description || "—"}
                      </td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => editCategory(cat)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteCategory(cat._id)}
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
        .category-container {
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

        .category-grid {
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
        .category-form-card {
          align-self: flex-start;
          height: fit-content;
          position: sticky;
          top: 20px;
        }

        .category-form {
          display: grid;
          gap: 14px;
        }

        .category-form input,
        .category-form textarea {
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
        .category-table-card {
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

        .desc-cell {
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
          .category-grid {
            grid-template-columns: 1fr;
            height: auto;
          }

          .category-table-card {
            overflow: visible;
          }

          .category-form-card {
            position: static;
          }
        }
      `}</style>
    </AdminLayout>
  );
}

export default Categories;
