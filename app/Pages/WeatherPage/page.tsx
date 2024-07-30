import React, { useEffect, useState } from "react";
import Heading from "../Heading/page";
import axios from "axios";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
  const city = "Bergen, NO";

  useEffect(() => {
    if (!apiKey) {
      setError("API key is missing.");
      setLoading(false);
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=no&appid=${apiKey}&units=metric`;

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
    return (
      <div className="flex justify-center items-center h-screen">
        <Heading>Loading...</Heading>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Heading>Error: {error}</Heading>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mb-4">
      <Heading>Været i dag</Heading>
      {weatherData ? (
        <div className="text-left">
          <p>Sted: {weatherData.name}</p>
          <p>Temperatur: {weatherData.main.temp.toFixed(1)} °C</p>
          <p>
            Vær: {weatherData.weather[0].description}
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              title={weatherData.weather[0].description}
              className="ml-6 scale-150"
            />
          </p>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default WeatherPage;

// import React, { useEffect, useState } from "react";
// import Heading from "../Heading/page";
// import axios from "axios";

// interface DailyWeather {
//   dt: number;
//   temp: {
//     day: number;
//   };
//   weather: {
//     description: string;
//     icon: string;
//   }[];
// }

// interface WeatherData {
//   current: {
//     temp: number;
//     weather: {
//       description: string;
//       icon: string;
//     }[];
//   };
//   daily: DailyWeather[];
// }

// const WeatherPage: React.FC = () => {
//   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
//   const lat = "60.39299"; // Latitude for Bergen, NO
//   const lon = "5.32415"; // Longitude for Bergen, NO

//   useEffect(() => {
//     if (!apiKey) {
//       setError("API key is missing.");
//       setLoading(false);
//       return;
//     }

//     const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric&lang=no`;

//     axios
//       .get(apiUrl)
//       .then((response) => {
//         if (response.data) {
//           setWeatherData(response.data);
//         } else {
//           setError("No data received.");
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(
//           "Error fetching weather data:",
//           error.response?.data || error.message
//         );
//         setError(
//           error.response?.data?.message ||
//             "An error occurred while fetching weather data."
//         );
//         setLoading(false);
//       });
//   }, [apiKey, lat, lon]);

//   const getDayName = (dt: number) => {
//     const date = new Date(dt * 1000);
//     return date.toLocaleDateString("en-US", { weekday: "long" });
//   };

//   if (loading) {
//     return <Heading>Loading...</Heading>;
//   }

//   if (error) {
//     return <Heading>Error: {error}</Heading>;
//   }

//   const forecastData = weatherData?.daily.slice(1, 7); // Get the next six days

//   return (
//     <div className="flex flex-col items-center">
//       <Heading>Været i dag</Heading>
//       {weatherData ? (
//         <div className="text-center mt-4">
//           <p>Sted: Bergen, NO</p>
//           <p>Temperatur: {weatherData.current.temp.toFixed(1)} °C</p>
//           <p>
//             Vær: {weatherData.current.weather[0].description}
//             <img
//               src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
//               alt={weatherData.current.weather[0].description}
//               title={weatherData.current.weather[0].description}
//               className="ml-8"
//             />
//           </p>
//         </div>
//       ) : (
//         <p>No weather data available.</p>
//       )}
//       <Heading>6-Day Forecast</Heading>
//       <div className="flex flex-wrap justify-center mt-4">
//         {forecastData &&
//           forecastData.map((day) => (
//             <div key={day.dt} className="text-center mx-2 mb-4">
//               <p>{getDayName(day.dt)}</p>
//               <img
//                 src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
//                 alt={day.weather[0].description}
//                 title={day.weather[0].description}
//               />
//               <p>{day.temp.day.toFixed(1)} °C</p>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default WeatherPage;
