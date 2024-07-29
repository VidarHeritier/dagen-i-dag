import React from "react";
import { StdButton } from "@/app/ButtonLink/page";

interface WeatherLinkProps {
  onClick?: () => void;
}

const WeatherLink: React.FC<WeatherLinkProps> = ({ onClick }) => {
  return (
    <div>
      {}
      <StdButton>Vær</StdButton>
    </div>
  );
};

export default WeatherLink;
