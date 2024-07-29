"use client";

import React, { MouseEventHandler, ReactNode } from "react";

interface StdButtonProps {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const StdButton: React.FC<StdButtonProps> = ({
  children = "button",
  onClick,
}) => {
  return (
    <button
      className="bg-red-400 p-2 rounded-t-md px-6 border-t-red-700 border-l-red-700 border-r-red-500 border-b-red-300 border-4 hover:bg-red-600 hover:scale-110 active:bg-red-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
