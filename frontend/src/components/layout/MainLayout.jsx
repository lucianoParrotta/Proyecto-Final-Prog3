import React from "react";
import Navbar from "../layout/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div>
      {isLoggedIn && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
