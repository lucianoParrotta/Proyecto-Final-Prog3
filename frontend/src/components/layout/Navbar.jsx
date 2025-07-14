import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Dashboard" },
    { path: "/productos", label: "Productos" },
    { path: "/categorias", label: "Categorías" },
    { path: "/movimientos", label: "Movimientos" },
    { path: "/crear-categoria", label: "+ Categoría" },
    { path: "/crear-producto", label: "+ Producto" },
    { path: "/crear-movimiento", label: "+ Movimiento" },
  ];

  const linkClasses = (path) =>
    classNames(
      "px-3 py-2 rounded hover:bg-blue-700 transition",
      {
        "bg-blue-900": location.pathname === path,
      }
    );

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <h1 className="text-xl font-bold tracking-tight">📦 Inventario App</h1>
        <ul className="flex flex-wrap gap-2 text-sm items-center">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className={linkClasses(link.path)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="px-3 py-2 rounded hover:bg-blue-700 transition"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
