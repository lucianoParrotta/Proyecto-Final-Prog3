import React, { useEffect, useState } from "react";
import api from "../services/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useFetch from "../hooks/useFetch";
import PageTitle from "../components/ui/PageTitle";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Button from "../components/ui/Button";

function ProductsPage() {
  const { data: products, loading, error } = useFetch("/products");
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (!products) return;
    const term = search.toLowerCase();
    const filteredList = products.filter((p) =>
      p.name.toLowerCase().includes(term)
    );
    setFiltered(filteredList);
  }, [search, products]);

  const handleDeleteRequest = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/products/${deleteId}`);
      toast.success("Producto eliminado");
      setFiltered((prev) => prev.filter((p) => p.id !== deleteId));
    } catch (error) {
      toast.error("No se pudo eliminar");
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <PageTitle>Productos</PageTitle>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-4 py-2 rounded shadow-sm"
        />
      </div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : filtered.length === 0 ? (
        <p>No hay productos que coincidan.</p>
      ) : (
        <table className="w-full text-sm text-left border-collapse bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border">ID</th>
              <th className="px-4 py-3 border">Nombre</th>
              <th className="px-4 py-3 border">Categoría</th>
              <th className="px-4 py-3 border">Precio</th>
              <th className="px-4 py-3 border">Stock</th>
              <th className="px-4 py-3 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">{p.id}</td>
                <td className="px-4 py-2 border">{p.name}</td>
                <td className="px-4 py-2 border">
                  {p.category ? p.category.name : "Sin categoría"}
                </td>
                <td className="px-4 py-2 border">${p.price}</td>
                <td className="px-4 py-2 border">{p.stock}</td>
                <td className="px-4 py-2 border space-x-2">
                  <Link
                    to={`/editar-producto/${p.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                  <Button variant="danger" onClick={() => handleDeleteRequest(p.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
        message="¿Estás seguro que deseas eliminar este producto?"
      />
    </div>
  );
}

export default ProductsPage;