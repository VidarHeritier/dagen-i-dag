import React from "react";

interface HeadingProps {
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ children }) => {
  return (
    <h1 className="text-3xl mb-12 flex flex-col items-center">{children}</h1>
  );
};

export default Heading;
