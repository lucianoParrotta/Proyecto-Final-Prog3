import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function EditProductPage() {
  const { id } = useParams();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Obtener el producto existente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get("/categories")
        ]);
        reset(prodRes.data); // precarga el form
        setCategories(catRes.data);
      } catch (error) {
        console.error("Error al cargar datos", error);
        toast.error("Error al cargar producto");
      }
    };
    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      data.price = parseFloat(data.price);
      data.stock = parseInt(data.stock, 10);
      await api.put(`/products/${id}`, data);
      toast.success("Producto actualizado");
      navigate("/productos");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      toast.error("Error al actualizar producto");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre</label>
          <input
            {...register("name", { required: "Campo obligatorio" })}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Descripción</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Precio</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: "Campo obligatorio" })}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Stock</label>
          <input
            type="number"
            {...register("stock", { required: "Campo obligatorio" })}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Categoría</label>
          <select
            {...register("categoryId", { required: "Seleccione categoría" })}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Seleccionar --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditProductPage;