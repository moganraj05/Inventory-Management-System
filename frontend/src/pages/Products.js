import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import AdminLayout from "../layouts/AdminLayout";

function Products() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // 🔍 Search & Filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    minStockLevel: ""
  });

  const location = useLocation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  //  URL-based Low Stock Filter (memoized)
  const applyLowStockFilter = useCallback(
    (data) => {
      const params = new URLSearchParams(location.search);
      const lowStock = params.get("lowStock");

      if (lowStock === "true") {
        return data.filter(
          p => p.quantity <= (p.minStockLevel || 0)
        );
      }
      return data;
    },
    [location.search]
  );

  //  FINAL DERIVED DATA (NO WARNINGS)
  const finalProducts = applyLowStockFilter(products).filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || p.category === categoryFilter;

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" &&
        p.quantity <= (p.minStockLevel || 0)) ||
      (stockFilter === "ok" &&
        p.quantity > (p.minStockLevel || 0));

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/products/${editingId}`, form);
    } else {
      await api.post("/products", form);
    }

    resetForm();
    fetchProducts();
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name,
      category: p.category,
      price: p.price,
      quantity: p.quantity,
      minStockLevel: p.minStockLevel || ""
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      price: "",
      quantity: "",
      minStockLevel: ""
    });
    setEditingId(null);
  };

  const showLowStock =
    new URLSearchParams(location.search).get("lowStock") === "true";

  return (
    <AdminLayout>
      <div className="product-container">

        {/* HEADER */}
        <h1 className="page-title">
          Product Management
          {showLowStock && <span className="badge">Low Stock</span>}
        </h1>

        <p className="page-subtitle">
          {showLowStock
            ? "Showing products below minimum stock level"
            : "Manage inventory items and stock levels"}
        </p>

        {/* GRID */}
        <div className="product-grid">

          {/* LEFT FORM */}
          <div className="card product-form-card">
            <h3>{editingId ? "Edit Product" : "Add Product"}</h3>

            <form className="product-form" onSubmit={handleSubmit}>
              <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
              <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
              <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
              <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
              <input type="number" name="minStockLevel" placeholder="Min Stock Level" value={form.minStockLevel} onChange={handleChange} />

              <button className="primary-btn" type="submit">
                {editingId ? "Update" : "Add"}
              </button>
            </form>
          </div>

          {/* RIGHT TABLE */}
          <div className="card product-table-card">
            <h3>Products</h3>

            {/* SEARCH + FILTER BAR */}
            <div className="filter-bar">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {[...new Set(products.map(p => p.category))].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
              >
                <option value="all">All Stock</option>
                <option value="low">Low Stock</option>
                <option value="ok">In Stock</option>
              </select>

              <button onClick={() => {
                setSearch("");
                setCategoryFilter("all");
                setStockFilter("all");
              }}>
                Reset
              </button>
            </div>

            {finalProducts.length === 0 ? (
              <div className="empty-state">
                No products matching this filter
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Qty</th>
                    <th>Min</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {finalProducts.map(p => (
                    <tr
                      key={p._id}
                      className={
                        p.quantity <= (p.minStockLevel || 0)
                          ? "danger-row"
                          : ""
                      }
                    >
                      <td>{p.name}</td>
                      <td>{p.category}</td>
                      <td>{p.quantity}</td>
                      <td>{p.minStockLevel || "-"}</td>
                      <td>₹{p.price}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>

      {/* CSS */}
      <style>{`
        .product-container {
          padding: 20px;
          background: #f1f5f9;
          min-height: calc(100vh - 70px);
        }

        .page-title {
          font-size: 28px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .badge {
          background: #dc2626;
          color: white;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 13px;
        }

        .product-grid {
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

        .product-form-card {
          align-self: flex-start;
          height: fit-content;
          position: sticky;
          top: 20px;
        }

        .product-form {
          display: grid;
          gap: 12px;
        }

        .product-form input {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
        }

        .primary-btn {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: white;
          border: none;
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
        }

        .product-table-card {
          overflow-y: auto;
        }

        .filter-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 15px;
        }

        .filter-bar input,
        .filter-bar select {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
        }

        .filter-bar button {
          background: #e5e7eb;
          border: none;
          padding: 10px 14px;
          border-radius: 8px;
          cursor: pointer;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .table th,
        .table td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }

        .danger-row {
          color: #dc2626;
          font-weight: 600;
        }

        .edit-btn {
          background: #2563eb;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 8px;
          margin-right: 6px;
        }

        .delete-btn {
          background: #dc2626;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 8px;
        }

        .empty-state {
          padding: 30px;
          text-align: center;
          color: #16a34a;
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: 1fr;
            height: auto;
          }

          .product-table-card {
            overflow: visible;
          }

          .product-form-card {
            position: static;
          }
        }
      `}</style>
    </AdminLayout>
  );
}

export default Products;
