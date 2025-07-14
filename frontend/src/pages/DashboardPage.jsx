import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import PageTitle from "../components/ui/PageTitle";

function DashboardPage() {
  const { data: products, loading: loadingProducts } = useFetch("/products");
  const { data: categories, loading: loadingCategories } = useFetch("/categories");
  const { data: movements, loading: loadingMovements } = useFetch("/movements");

  const [summary, setSummary] = useState({
    products: 0,
    categories: 0,
    movements: 0,
    stockTotal: 0,
  });

  useEffect(() => {
    if (products && categories && movements) {
      const stockTotal = (products || []).reduce((sum, p) => sum + p.stock, 0);

      setSummary({
        products: (products || []).length,
        categories: (categories || []).length,
        movements: (movements || []).length,
        stockTotal,
      });
    }
  }, [products, categories, movements]);

  const loading = loadingProducts || loadingCategories || loadingMovements;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-white">
      <PageTitle>Panel de Control</PageTitle>

      {loading ? (
        <p className="text-gray-600">Cargando resumen...</p>
      ) : (
        <>
          {/* Resumen */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <Link
              to="/productos"
              className="bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-500">Productos</p>
              <p className="text-3xl font-bold text-indigo-600">{summary.products}</p>
            </Link>

            <Link
              to="/categorias"
              className="bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-500">Categorías</p>
              <p className="text-3xl font-bold text-indigo-600">{summary.categories}</p>
            </Link>

            <Link
              to="/movimientos"
              className="bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-500">Movimientos</p>
              <p className="text-3xl font-bold text-indigo-600">{summary.movements}</p>
            </Link>

            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 text-center">
              <p className="text-sm text-indigo-700 font-medium mb-1">Stock total</p>
              <p className="text-3xl font-bold text-indigo-800">{summary.stockTotal}</p>
            </div>
          </div>

          {/* Últimos movimientos */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Últimos movimientos
            </h2>

            {(movements || []).length === 0 ? (
              <p className="text-gray-500">No hay movimientos registrados.</p>
            ) : (
              <ul className="space-y-3">
                {(movements || [])
                  .slice(-6)
                  .reverse()
                  .map((m) => (
                    <li
                      key={m.id}
                      className={`rounded-lg p-4 shadow-sm bg-white border-l-4 ${
                        m.type === "entrada" ? "border-green-500" : "border-red-500"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-800">
                          {m.product?.name || "Producto desconocido"}
                        </p>
                        <span
                          className={`text-sm font-semibold ${
                            m.type === "entrada" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {m.type === "entrada" ? "+" : "-"} {m.quantity}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(m.createdAt).toLocaleDateString()} — ID #{m.id}
                      </p>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardPage;