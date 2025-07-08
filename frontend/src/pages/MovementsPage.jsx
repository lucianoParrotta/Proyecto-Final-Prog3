import React, { useEffect, useState } from "react";
import api from "../services/axios";

function MovementsPage() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const res = await api.get("/movements");
        setMovements(res.data);
      } catch (error) {
        console.error("Error al obtener movimientos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovements();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Movimientos de Inventario</h1>

      {loading ? (
        <p>Cargando movimientos...</p>
      ) : movements.length === 0 ? (
        <p>No hay movimientos registrados.</p>
      ) : (
        <table className="w-full text-sm text-left border-collapse bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border">ID</th>
              <th className="px-4 py-3 border">Producto</th>
              <th className="px-4 py-3 border">Tipo</th>
              <th className="px-4 py-3 border">Cantidad</th>
              <th className="px-4 py-3 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">{m.id}</td>
                <td className="px-4 py-2 border">{m.product?.name ?? "Sin producto"}</td>
                <td className={`px-4 py-2 border font-semibold ${m.type === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                  {m.type}
                </td>
                <td className="px-4 py-2 border">{m.quantity}</td>
                <td className="px-4 py-2 border">{new Date(m.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MovementsPage;
