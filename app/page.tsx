"use client";

import React, { useState } from "react";
import Header from "./Header/page";
import Skeleton from "./Sceleton/page";
import MainLinks from "./MainLinks/page";

import WeatherPage from "./Pages/WeatherPage/page";
import NewsPage from "./Pages/NewsPage/page";
import CulturePage from "./Pages/CulturePage/page";
import TrafficPage from "./Pages/TrafficPage/page";

import styles from "../page.module.css";

const App: React.FC = () => {
  const [content, setContent] = useState<React.ReactNode>("Landing page");

  const handleWeatherClick = () => {
    setContent(<WeatherPage />);
  };

  const handleNewsClick = () => {
    setContent(<NewsPage />);
  };

  const handleCultureClick = () => {
    setContent(<CulturePage />);
  };

  const handleTrafficClick = () => {
    setContent(<TrafficPage />);
  };

  return (
    <main>
      <Header />
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
