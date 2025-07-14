import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/axios";
import CategoryForm from "../components/common/CategoryForm";

function CreateCategoryPage() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await api.post("/categories", data);
      toast.success("Categoría creada correctamente");
      navigate("/categorias");
    } catch (error) {
      const res = error.response;
      if (res?.status === 400 && Array.isArray(res.data.errors)) {
        res.data.errors.forEach((err) => toast.error(err.msg));
      } else {
        toast.error("No se pudo crear la categoría");
      }
    }
  };

  return <CategoryForm onSubmit={handleCreate} title="Crear Categoría" />;
}

export default CreateCategoryPage;