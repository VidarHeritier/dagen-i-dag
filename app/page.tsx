"use client";

import React, { useState } from "react";
import Header from "./Header/page";
import Skeleton from "./Sceleton/page";
import MainLinks from "./MainLinks/page";
import WeatherPage from "./Pages/WeatherPage/page";
import NewsPage from "./Pages/NewsPage/page";
import CulturePage from "./Pages/CulturePage/page";
import TrafficPage from "./Pages/TrafficPage/page";
import LocationComponent from "./Location/page";
import styles from "../page.module.css";

interface Location {
  city: string;
  country: string;
}

type Content = React.ReactNode;

const App: React.FC = () => {
  const [content, setContent] = useState<Content>("Landing page");
  const [location, setLocation] = useState<Location | null>(null);

  const handleWeatherClick = () => {
    if (location) {
      setContent(<WeatherPage location={location} />);
    } else {
      setContent(<p>Please provide your location.</p>);
    }
  };

  const handleNewsClick = () => {
    if (location) {
      setContent(<NewsPage location={location} />);
    } else {
      setContent(<p>Please provide your location.</p>);
    }
  };

  const handleCultureClick = () => {
    if (location) {
      setContent(<CulturePage location={location} />);
    } else {
      setContent(<p>Please provide your location.</p>);
    }
  };

  const handleTrafficClick = () => {
    if (location) {
      setContent(<TrafficPage />);
    } else {
      setContent(<p>Please provide your location.</p>);
    }
  };

  return (
    <main>
      <Header />
      <LocationComponent onLocationFetched={setLocation} />
      <MainLinks
        onWeatherClick={handleWeatherClick}
        onNewsClick={handleNewsClick}
        onCultureClick={handleCultureClick}
        onTrafficClick={handleTrafficClick}
      />
      <Skeleton className={styles.content} content={content} />
    </main>
  );
};

export default App;
