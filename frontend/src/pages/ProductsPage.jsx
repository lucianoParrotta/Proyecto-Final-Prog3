import React, { useEffect, useState } from "react";
import api from "../services/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

    // Cargar productos al inicio
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const res = await api.get("/products");
            setProducts(res.data);
            setFiltered(res.data); // también inicializamos el filtrado
        } catch (error) {
            console.error("Error al obtener productos:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchProducts();
    }, []);

  // Filtrar productos cuando cambia el search o la lista
    useEffect(() => {
        const term = search.toLowerCase();
        const filteredList = products.filter((p) =>
        p.name.toLowerCase().includes(term)
        );
        setFiltered(filteredList);
    }, [search, products]);

    const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro que deseas eliminar este producto?");
    if (!confirm) return;

    try {
        await api.delete(`/products/${id}`);
        toast.success("Producto eliminado");
        setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        toast.error("No se pudo eliminar");
    }
    };


  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>

      {/* Input de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-4 py-2 rounded shadow-sm"
        />
      </div>

      {/* Tabla de productos */}
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
                <td className="px-4 py-2 border">
                <Link
                    to={`/editar-producto/${p.id}`}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Editar
                </Link>
                <button
                    onClick={() => handleDelete(p.id)}
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

export default ProductsPage;
