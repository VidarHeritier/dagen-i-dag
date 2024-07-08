import React from "react";
import WeatherLink from "./WeatherLink/weatherLink";
import NewsLink from "./NewsLink/newsLink";
import CultureLink from "./CultureLink/cultureLink";
import TrafficLink from "./TrafficLink/trafficLink";

export default function MainLinks() {
  return (
    <div className="flex flex-row justify-end gap-28 mr-60">
      <WeatherLink /> <NewsLink /> <CultureLink /> <TrafficLink />
    </div>
  );
}
