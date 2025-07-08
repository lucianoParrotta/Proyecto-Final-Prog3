import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/axios";

function EditCategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get(`/categories/${id}`);
        reset(res.data);
      } catch (error) {
        toast.error("No se pudo cargar la categoría");
      }
    };
    fetchCategory();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/categories/${id}`, data);
      toast.success("Categoría actualizada");
      navigate("/categorias");
    } catch (error) {
      toast.error("Error al actualizar categoría");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Editar Categoría</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre</label>
          <input
            {...register("name", { required: "Campo obligatorio" })}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditCategoryPage;