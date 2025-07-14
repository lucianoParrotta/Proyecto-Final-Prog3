import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/axios";
import useFetch from "../hooks/useFetch";
import PageTitle from "../components/ui/PageTitle";
import Button from "../components/ui/Button";
import ConfirmDialog from "../components/common/ConfirmDialog";

function CategoriesPage() {
  const { data: categories, loading } = useFetch("/categories");

  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (!categories) return;
    const term = search.toLowerCase();
    const filteredList = categories.filter((c) =>
      c.name.toLowerCase().includes(term)
    );
    setFiltered(filteredList);
  }, [search, categories]);

  const handleDeleteRequest = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/categories/${deleteId}`);
      toast.success("Categoría eliminada");
      setFiltered((prev) => prev.filter((c) => c.id !== deleteId));
    } catch (error) {
      toast.error("No se pudo eliminar la categoría");
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <PageTitle>Categorías</PageTitle>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar categoría por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-4 py-2 rounded shadow-sm"
        />
      </div>

      {loading ? (
        <p>Cargando categorías...</p>
      ) : filtered.length === 0 ? (
        <p>No hay categorías que coincidan.</p>
      ) : (
        <table className="w-full text-sm text-left border-collapse bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border">ID</th>
              <th className="px-4 py-3 border">Nombre</th>
              <th className="px-4 py-3 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">{c.id}</td>
                <td className="px-4 py-2 border">{c.name}</td>
                <td className="px-4 py-2 border space-x-2">
                  <Link
                    to={`/editar-categoria/${c.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                  <Button variant="danger" onClick={() => handleDeleteRequest(c.id)}>
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
        message="¿Estás seguro que deseas eliminar esta categoría?"
      />
    </div>
  );
}

export default CategoriesPage;