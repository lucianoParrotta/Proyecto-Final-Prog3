import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import CreateProductPage from "./pages/CreateProductPage";
import MovementsPage from "./pages/MovementsPage";
import CreateMovementPage from "./pages/CreateMovementPage";
import DashboardPage from "./pages/DashboardPage";
import EditProductPage from "./pages/EditProductPage";
import EditCategoryPage from "./pages/EditCategoryPage";

import Navbar from "./components/Navbar";



function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/categorias" element={<CategoriesPage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/crear-categoria" element={<CreateCategoryPage />} />
        <Route path="/crear-producto" element={<CreateProductPage />} />
        <Route path="/movimientos" element={<MovementsPage />} />
        <Route path="/crear-movimiento" element={<CreateMovementPage />} />
        <Route path="/editar-producto/:id" element={<EditProductPage />} />
        <Route path="/editar-categoria/:id" element={<EditCategoryPage />} />
      </Routes>
    </Router>

  );
}

export default App;
