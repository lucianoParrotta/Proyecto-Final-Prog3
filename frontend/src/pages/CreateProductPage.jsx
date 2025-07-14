import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/axios";
import ProductForm from "../components/common/ProductForm";

function CreateProductPage() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      data.price = parseFloat(data.price);
      data.stock = parseInt(data.stock, 10);
      await api.post("/products", data);
      toast.success("Producto creado correctamente");
      navigate("/productos");
    } catch (error) {
      const res = error.response;
      if (res?.status === 400 && Array.isArray(res.data.errors)) {
        res.data.errors.forEach((err) => toast.error(err.msg));
      } else {
        toast.error("No se pudo crear el producto");
      }
    }
  };

  return <ProductForm onSubmit={handleCreate} title="Crear Producto" />;
}

export default CreateProductPage;
