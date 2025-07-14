import React from "react";

function LoadingMessage({ text = "Cargando..." }) {
  return (
    <p className="text-gray-600 text-sm italic text-center py-4">
      {text}
    </p>
  );
}

export default LoadingMessage;