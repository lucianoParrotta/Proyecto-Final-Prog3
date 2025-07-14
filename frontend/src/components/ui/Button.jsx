import React from "react";
import clsx from "clsx";

function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = false,
  disabled = false,
  className = "",
  ...rest
}) {
  const baseClasses = "px-4 py-2 rounded font-semibold shadow transition text-sm";
  const fullWidthClass = fullWidth ? "w-full" : "";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    secondary: "bg-gray-300 hover:bg-gray-400 text-gray-800"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseClasses,
        variants[variant],
        fullWidthClass,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
