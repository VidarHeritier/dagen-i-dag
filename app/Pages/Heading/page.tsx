import React from "react";

interface HeadingProps {
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ children }) => {
  return <h1 className="flex justify-center">{children}</h1>;
};

export default Heading;
