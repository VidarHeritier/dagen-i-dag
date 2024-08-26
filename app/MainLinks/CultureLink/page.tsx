import React from "react";
import StdButton from "@/app/ButtonLink/page";

interface CultureLinkProps {
  onClick?: () => void;
}

const CultureLink: React.FC<CultureLinkProps> = ({ onClick }) => {
  return (
    <div>
      {}
      <StdButton>Opplevelser</StdButton>
    </div>
  );
};

export default CultureLink;
