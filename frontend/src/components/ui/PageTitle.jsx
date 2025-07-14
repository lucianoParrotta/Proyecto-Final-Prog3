import React from "react";

function PageTitle({ children }) {
  return (
    <h1 className="text-2xl font-bold mb-6 text-gray-800">
      {children}
    </h1>
  );
}

export default PageTitle;