"use client";

import React, { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const StdButton: React.FC<ButtonProps> = ({ children = "Button", onClick }) => {
  return (
    <button
      className="
        bg-red-400
        p-2
        rounded-t-md
        px-6
        border-t-red-700
        border-l-red-700
        border-r-red-500
        border-b-red-300
        border-4
        hover:bg-red-600
        hover:scale-110
        active:bg-red-500
      "
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default StdButton;
