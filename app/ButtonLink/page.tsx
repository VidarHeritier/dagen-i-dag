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
      className="bg-red-400 p-2 rounded-t-md px-6 border-t-red-600 border-l-red-600 border-r-red-600 border-b-red-400 border-4 hover:bg-red-300 "
      onClick={onClick}
    >
      {children}
    </button>
  );
};
