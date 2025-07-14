import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";


function CategoryForm({ onSubmit, defaultValues = {}, title = "Formulario de Categoría" }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues
  });

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
  }, [reset]);

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

        {/* Botón */}
        <Button type="submit" variant="primary">
            Guardar Categoría
        </Button>
      </form>
    </div>
  );
}

export default CategoryForm;