import React from "react";
import { useForm } from "react-hook-form";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function CreateCategoryPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.post("/categories", data);
      toast.success("Categoría creada correctamente");
      reset();
      navigate("/");
    } catch (error) {
      console.error("Error al crear categoría:", error);
      toast.error("Error al crear categoría");
    }
  };

  return (
    <div className ="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Crear Categoría</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre</label>
          <input
            {...register("name", { required: "Este campo es obligatorio" })}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition"
        >
          Crear
        </button>

      </form>
    </div>
  );
}

export default CreateCategoryPage;
