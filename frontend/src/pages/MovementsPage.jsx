import React from "react";
import useFetch from "../hooks/useFetch";
import PageTitle from "../components/ui/PageTitle";

function MovementsPage() {
  const { data: movements, loading, error } = useFetch("/movements");

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <PageTitle>Movimientos de Inventario</PageTitle>

      {loading ? (
        <p>Cargando movimientos...</p>
      ) : error ? (
        <p className="text-red-600">Error al cargar movimientos.</p>
      ) : movements.length === 0 ? (
        <p>No hay movimientos registrados.</p>
      ) : (
        <table className="w-full text-sm text-left border-collapse bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border">ID</th>
              <th className="px-4 py-3 border">Producto</th>
              <th className="px-4 py-3 border">Cantidad</th>
              <th className="px-4 py-3 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">{m.id}</td>
                <td className="px-4 py-2 border">{m.product?.name || "Sin producto"}</td>
                <td className="px-4 py-2 border">{m.quantity}</td>
                <td className="px-4 py-2 border">
                  {new Date(m.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MovementsPage;