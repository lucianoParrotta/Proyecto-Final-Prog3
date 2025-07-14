import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import api from "../../services/axios";
import toast from "react-hot-toast";
import Button from "../ui/Button";

function ProductForm({ onSubmit, defaultValues = {}, title = "Formulario de Producto" }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues });

  const [categories, setCategories] = useState([]);
  const prevDefaults = useRef();

  // resetea si defaultValues realmente cambian
  useEffect(() => {
    const stringified = JSON.stringify(defaultValues);
    if (stringified !== prevDefaults.current) {
      prevDefaults.current = stringified;
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  // Cargar categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (error) {
        toast.error("Error al cargar categorías");
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            {...register("name", { required: "Campo obligatorio" })}
            className={`w-full border p-2 rounded ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Descripción */}
        <div>
          <label className="block mb-1 font-medium">Descripción</label>
          <textarea {...register("description")} className="w-full border p-2 rounded" />
        </div>

        {/* Precio */}
        <div>
          <label className="block mb-1 font-medium">Precio</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: "Campo obligatorio" })}
            className={`w-full border p-2 rounded ${errors.price ? "border-red-500" : ""}`}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input
            type="number"
            {...register("stock", { required: "Campo obligatorio" })}
            className={`w-full border p-2 rounded ${errors.stock ? "border-red-500" : ""}`}
          />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
        </div>

        {/* Categoría */}
        <div>
          <label className="block mb-1 font-medium">Categoría</label>
          <select
            {...register("categoryId", { required: "Seleccione una categoría" })}
            className={`w-full border p-2 rounded ${errors.categoryId ? "border-red-500" : ""}`}
          >
            <option value="">-- Seleccionar --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
        </div>

        {/* Botón */}
        <Button type="submit" variant="primary">
          Guardar Producto
        </Button>
      </form>
    </div>
  );
}

export default ProductForm;
