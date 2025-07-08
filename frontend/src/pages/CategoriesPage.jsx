import React, { useEffect, useState } from "react";
import api from "../services/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Eliminar esta categoría?");
    if (!confirm) return;

    try {
      await api.delete(`/categories/${id}`);
      toast.success("Categoría eliminada");
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      toast.error("No se pudo eliminar. ¿Tiene productos asociados?");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Categorías</h1>

      {loading ? (
        <p>Cargando categorías...</p>
      ) : categories.length === 0 ? (
        <p>No hay categorías registradas.</p>
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
            {categories.map((c) => (
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
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CategoriesPage;
