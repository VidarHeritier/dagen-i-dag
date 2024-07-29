import React from "react";
import { StdButton } from "@/app/ButtonLink/page";

interface NewsLinkProps {
  onClick?: () => void;
}

const NewsLink: React.FC<NewsLinkProps> = ({ onClick }) => {
  return (
    <div>
      {}
      <StdButton>Nyheter</StdButton>
    </div>
  );
};

export default NewsLink;
