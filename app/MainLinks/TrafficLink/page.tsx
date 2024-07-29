import React from "react";
import { StdButton } from "@/app/ButtonLink/page";

interface TrafficLinkProps {
  onClick?: () => void;
}

const TrafficLink: React.FC<TrafficLinkProps> = ({ onClick }) => {
  return (
    <div>
      {}
      <StdButton>Trafikk</StdButton>
    </div>
  );
};

export default TrafficLink;
