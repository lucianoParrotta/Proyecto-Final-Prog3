import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/axios";
import useFetch from "../hooks/useFetch";
import CategoryForm from "../components/common/CategoryForm";
import LoadingMessage from "../components/ui/LoadingMessage";
import PageTitle from "../components/ui/PageTitle";

function EditCategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: category, loading, error } = useFetch(`/categories/${id}`);

  const handleUpdate = async (data) => {
    try {
      await api.put(`/categories/${id}`, data);
      toast.success("Categoría actualizada correctamente");
      navigate("/categorias");
    } catch (error) {
      const res = error.response;
      if (res?.status === 400 && Array.isArray(res.data.errors)) {
        res.data.errors.forEach((err) => toast.error(err.msg));
      } else {
        toast.error("No se pudo actualizar la categoría");
      }
    }
  };

  if (loading) return <LoadingMessage text="Cargando categoría..." />;
  if (error) return <p className="text-red-600 text-center">Error al cargar la categoría</p>;
  if (!category) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <PageTitle>Editar Categoría</PageTitle>
      <CategoryForm onSubmit={handleUpdate} defaultValues={category} title="" />
    </div>
  );
}

export default EditCategoryPage;
