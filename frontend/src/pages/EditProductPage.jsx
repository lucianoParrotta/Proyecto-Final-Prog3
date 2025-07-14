import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/axios";
import ProductForm from "../components/common/ProductForm";
import useFetch from "../hooks/useFetch";
import LoadingMessage from "../components/ui/LoadingMessage";
import PageTitle from "../components/ui/PageTitle";

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, loading, error } = useFetch(`/products/${id}`);

  const handleUpdate = async (data) => {
    try {
      data.price = parseFloat(data.price);
      data.stock = parseInt(data.stock, 10);
      await api.put(`/products/${id}`, data);
      toast.success("Producto actualizado correctamente");
      navigate("/productos");
    } catch (error) {
      const res = error.response;
      if (res?.status === 400 && Array.isArray(res.data.errors)) {
        res.data.errors.forEach((err) => toast.error(err.msg));
      } else {
        toast.error("No se pudo actualizar el producto");
      }
    }
  };

  if (loading) return <LoadingMessage text="Cargando producto..." />;
  if (error) return <p className="text-red-600 text-center">Error al cargar el producto</p>;
  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <PageTitle>Editar Producto</PageTitle>
      <ProductForm onSubmit={handleUpdate} defaultValues={product} title="" />
    </div>
  );
}

export default EditProductPage;