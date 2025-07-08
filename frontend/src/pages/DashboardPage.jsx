import React, { useEffect, useState } from "react";
import api from "../services/axios";
import { Link } from "react-router-dom";

function DashboardPage() {
  const [summary, setSummary] = useState({
    products: 0,
    categories: 0,
    movements: 0,
    stockTotal: 0
  });
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [productsRes, categoriesRes, movementsRes] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
          api.get("/movements")
        ]);

        const stockTotal = productsRes.data.reduce((sum, p) => sum + p.stock, 0);

        setProducts(productsRes.data);
        setMovements(movementsRes.data);

        setSummary({
          products: productsRes.data.length,
          categories: categoriesRes.data.length,
          movements: movementsRes.data.length,
          stockTotal
        });
      } catch (error) {
        console.error("Error al cargar resumen:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Control</h1>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        <Link to="/productos" className="bg-blue-100 p-4 rounded shadow hover:bg-blue-200 transition text-center">
          <p className="text-xl font-bold">{summary.products}</p>
          <p className="text-sm text-gray-700">Productos</p>
        </Link>
        <Link to="/categorias" className="bg-green-100 p-4 rounded shadow hover:bg-green-200 transition text-center">
          <p className="text-xl font-bold">{summary.categories}</p>
          <p className="text-sm text-gray-700">Categorías</p>
        </Link>
        <Link to="/movimientos" className="bg-yellow-100 p-4 rounded shadow hover:bg-yellow-200 transition text-center">
          <p className="text-xl font-bold">{summary.movements}</p>
          <p className="text-sm text-gray-700">Movimientos</p>
        </Link>
        <Link to="/productos" className="bg-indigo-100 p-4 rounded shadow hover:bg-indigo-200 transition text-center">
          <p className="text-xl font-bold">{summary.stockTotal}</p>
          <p className="text-sm text-gray-700">Stock Total</p>
        </Link>
      </div>

      {/* Últimos movimientos */}
      <h2 className="text-lg font-semibold mt-8 mb-2">Últimos movimientos</h2>
      {movements.length === 0 ? (
        <p className="text-gray-500">No hay movimientos recientes.</p>
      ) : (
        <ul className="bg-gray-50 rounded shadow divide-y">
          {movements.slice(0, 5).map((m) => (
            <li key={m.id} className="p-3 flex justify-between text-sm">
              <span>{m.product?.name ?? "Sin producto"} ({m.type})</span>
              <span className={m.type === 'entrada' ? "text-green-600" : "text-red-600"}>
                {m.quantity} u.
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Productos con poco stock */}
      <h2 className="text-lg font-semibold mt-8 mb-2">Productos con poco stock</h2>
      {products.filter((p) => p.stock <= 5).length === 0 ? (
        <p className="text-gray-500">No hay productos con stock bajo.</p>
      ) : (
        <ul className="bg-red-50 rounded shadow divide-y">
          {products
            .filter((p) => p.stock <= 5)
            .map((p) => (
              <li key={p.id} className="p-3 flex justify-between text-sm text-red-700">
                <span>{p.name}</span>
                <span>{p.stock} u.</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default DashboardPage;