import React, { useEffect, useState } from "react";
import Heading from "../Heading/page";
import axios from "axios";

// import styles from "./WeatherPage.module.css";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
  const city = "Bergen, NO";

  console.log(process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY);

  useEffect(() => {
    if (!apiKey) {
      setError("API key is missing.");
      setLoading(false);
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data) {
          setWeatherData(response.data);
        } else {
          setError("No data received.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching weather data:",
          error.response?.data || error.message
        );
        setError(
          error.response?.data?.message ||
            "An error occurred while fetching weather data."
        );
        setLoading(false);
      });
  }, [city, apiKey]);

  if (loading) {
    return <Heading>Loading...</Heading>;
  }

  if (error) {
    return <Heading>Error: {error}</Heading>;
  }

  return (
    <div>
      <Heading>Været i dag</Heading>
      {weatherData ? (
        <div>
          <p>Location: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp.toFixed(1)} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default WeatherPage;
