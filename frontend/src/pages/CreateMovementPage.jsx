import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CreateMovementPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProducts();
  }, []);

  const onSubmit = async (data) => {
    try {
      data.quantity = parseInt(data.quantity, 10);

      await api.post("/movements", data);
      toast.success("Movimiento registrado");
      reset();
      navigate("/movimientos");
    } catch (error) {
      console.error("Error al registrar movimiento:", error);
      toast.error("Error al registrar movimiento");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Registrar Movimiento</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Producto</label>
          <select
            {...register("productId", { required: "Seleccione un producto" })}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Seleccionar --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.productId && <p className="text-red-500">{errors.productId.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Cantidad</label>
          <input
            type="number"
            {...register("quantity", { required: "Este campo es obligatorio" })}
            className="w-full border p-2 rounded"
          />
          {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Tipo</label>
          <select
            {...register("type", { required: "Seleccione el tipo de movimiento" })}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Seleccionar --</option>
            <option value="entrada">Entrada</option>
            <option value="salida">Salida</option>
          </select>
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition"
        >
          Registrar Movimiento
        </button>
      </form>
    </div>
  );
}

export default CreateMovementPage;