import React from "react";
import { StdButton } from "../ButtonLink/page";

interface MainLinksProps {
  onWeatherClick: () => void;
  onNewsClick: () => void;
  onCultureClick: () => void;
  onTrafficClick: () => void;
}

const MainLinks: React.FC<MainLinksProps> = ({
  onWeatherClick,
  onNewsClick,
  onCultureClick,
  onTrafficClick,
}) => {
  return (
    <nav className="flex flex-row justify-evenly ml-80 mr-24 ">
      <StdButton onClick={onWeatherClick}>Været</StdButton>
      <StdButton onClick={onNewsClick}>Nyheter</StdButton>
      <StdButton onClick={onCultureClick}>Opplevelser</StdButton>
      <StdButton onClick={onTrafficClick}>Trafikken</StdButton>
    </nav>
  );
};

export default MainLinks;
