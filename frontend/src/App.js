import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/common/PrivateRoute";
import MainLayout from "./components/layout/MainLayout";

import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import CreateProductPage from "./pages/CreateProductPage";
import MovementsPage from "./pages/MovementsPage";
import CreateMovementPage from "./pages/CreateMovementPage";
import DashboardPage from "./pages/DashboardPage";
import EditProductPage from "./pages/EditProductPage";
import EditCategoryPage from "./pages/EditCategoryPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="categorias" element={<CategoriesPage />} />
          <Route path="productos" element={<ProductsPage />} />
          <Route path="crear-categoria" element={<CreateCategoryPage />} />
          <Route path="crear-producto" element={<CreateProductPage />} />
          <Route path="movimientos" element={<MovementsPage />} />
          <Route path="crear-movimiento" element={<CreateMovementPage />} />
          <Route path="editar-producto/:id" element={<EditProductPage />} />
          <Route path="editar-categoria/:id" element={<EditCategoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

