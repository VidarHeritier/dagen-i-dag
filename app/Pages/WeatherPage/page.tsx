// import React, { useEffect, useState } from "react";
// import Heading from "../Heading/page";
// import axios from "axios";
// import xml2js from "xml2js";

// interface WeatherData {
//   temperature: number;
//   windDirection: string;
//   windSpeed: number;
//   windGust: number;
//   humidity: number;
//   pressure: number;
//   cloudiness: number;
//   lowClouds: number;
//   mediumClouds: number;
//   highClouds: number;
//   dewpointTemperature: number;
//   symbol: string;
//   time?: string;
// }

// const WeatherPage: React.FC = () => {
//   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
//   const [forecastData, setForecastData] = useState<WeatherData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const apiUrl =
//     "https://api.met.no/weatherapi/locationforecast/2.0/classic?lat=59.93&lon=10.72&altitude=90";

//   useEffect(() => {
//     axios
//       .get(apiUrl, { headers: { "User-Agent": "YourAppName/1.0" } })
//       .then((response) => {
//         const parser = new xml2js.Parser();
//         parser.parseString(response.data, (err: any, result: any) => {
//           if (err) {
//             setError("Error parsing XML data.");
//             setLoading(false);
//             return;
//           }

//           try {
//             const weather = result.weatherdata.product[0].time[0].location[0];
//             const parsedData: WeatherData = {
//               temperature: parseFloat(weather.temperature[0].$.value),
//               windDirection: weather.windDirection[0].$.name,
//               windSpeed: parseFloat(weather.windSpeed[0].$.mps),
//               windGust: parseFloat(weather.windGust[0].$.mps),
//               humidity: parseFloat(weather.humidity[0].$.value),
//               pressure: parseFloat(weather.pressure[0].$.value),
//               cloudiness: parseFloat(weather.cloudiness[0].$.percent),
//               lowClouds: parseFloat(weather.lowClouds[0].$.percent),
//               mediumClouds: parseFloat(weather.mediumClouds[0].$.percent),
//               highClouds: parseFloat(weather.highClouds[0].$.percent),
//               dewpointTemperature: parseFloat(
//                 weather.dewpointTemperature[0].$.value
//               ),
//               symbol:
//                 result.weatherdata.product[0].time[1].location[0].symbol[0].$
//                   .code,
//             };

//             setWeatherData(parsedData);

//             const dailyForecast = result.weatherdata.product[0].time
//               .slice(1, 7)
//               .map((timeData: any) => {
//                 const location = timeData.location[0];
//                 return {
//                   time: timeData.$.from,
//                   temperature: parseFloat(location.temperature[0].$.value),
//                   windDirection: location.windDirection[0].$.name,
//                   windSpeed: parseFloat(location.windSpeed[0].$.mps),
//                   windGust: parseFloat(location.windGust[0].$.mps),
//                   humidity: parseFloat(location.humidity[0].$.value),
//                   pressure: parseFloat(location.pressure[0].$.value),
//                   cloudiness: parseFloat(location.cloudiness[0].$.percent),
//                   lowClouds: parseFloat(location.lowClouds[0].$.percent),
//                   mediumClouds: parseFloat(location.mediumClouds[0].$.percent),
//                   highClouds: parseFloat(location.highClouds[0].$.percent),
//                   dewpointTemperature: parseFloat(
//                     location.dewpointTemperature[0].$.value
//                   ),
//                   symbol: location.symbol[0].$.code,
//                 };
//               });

//             setForecastData(dailyForecast);
//           } catch (parseError) {
//             setError("Error parsing weather data.");
//           }
//           setLoading(false);
//         });
//       })
//       .catch((error) => {
//         console.error(
//           "Error fetching weather data:",
//           error.response?.data || error.message
//         );
//         setError("An error occurred while fetching weather data.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Heading>Loading...</Heading>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Heading>Error: {error}</Heading>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center mb-4">
//       <Heading>Været i dag</Heading>
//       {weatherData ? (
//         <div className="text-left">
//           <p>Temperatur: {weatherData.temperature.toFixed(1)} °C</p>
//           <p>Vindretning: {weatherData.windDirection}</p>
//           <p>Vindhastighet: {weatherData.windSpeed.toFixed(1)} m/s</p>
//           <p>Vindkast: {weatherData.windGust.toFixed(1)} m/s</p>
//           <p>Fuktighet: {weatherData.humidity.toFixed(1)}%</p>
//           <p>Lufttrykk: {weatherData.pressure.toFixed(1)} hPa</p>
//           <p>Skydekke: {weatherData.cloudiness.toFixed(1)}%</p>
//           <p>Lave skyer: {weatherData.lowClouds.toFixed(1)}%</p>
//           <p>Middels skyer: {weatherData.mediumClouds.toFixed(1)}%</p>
//           <p>Høye skyer: {weatherData.highClouds.toFixed(1)}%</p>
//           <p>Duggpunkt: {weatherData.dewpointTemperature.toFixed(1)} °C</p>
//           <img
//             src={`https://api.met.no/images/weathericons/svg/${weatherData.symbol}.svg`}
//             alt="Weather symbol"
//             title="Weather symbol"
//             className="ml-6 scale-150"
//           />
//         </div>
//       ) : (
//         <p>No weather data available.</p>
//       )}
//       <Heading>Værmelding for de neste seks dagene</Heading>
//       <div className="flex flex-col items-center">
//         {forecastData.map((forecast, index) => (
//           <div key={index} className="mb-2 text-left">
//             <p>Dato: {new Date(forecast.time || "").toLocaleDateString()}</p>
//             <p>Temperatur: {forecast.temperature.toFixed(1)} °C</p>
//             <p>Vindretning: {forecast.windDirection}</p>
//             <p>Vindhastighet: {forecast.windSpeed.toFixed(1)} m/s</p>
//             <p>Vindkast: {forecast.windGust.toFixed(1)} m/s</p>
//             <p>Fuktighet: {forecast.humidity.toFixed(1)}%</p>
//             <p>Lufttrykk: {forecast.pressure.toFixed(1)} hPa</p>
//             <p>Skydekke: {forecast.cloudiness.toFixed(1)}%</p>
//             <p>Lave skyer: {forecast.lowClouds.toFixed(1)}%</p>
//             <p>Middels skyer: {forecast.mediumClouds.toFixed(1)}%</p>
//             <p>Høye skyer: {forecast.highClouds.toFixed(1)}%</p>
//             <p>Duggpunkt: {forecast.dewpointTemperature.toFixed(1)} °C</p>
//             <img
//               src={`https://api.met.no/images/weathericons/svg/${forecast.symbol}.svg`}
//               alt="Weather symbol"
//               title="Weather symbol"
//               className="ml-6 scale-150"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default WeatherPage;

// // WeatherPage.tsx

import React, { useEffect, useState } from "react";
import Heading from "../Heading/page";
import axios from "axios";
import xml2js from "xml2js";

interface WeatherData {
  temperature: number;
  windDirection: string;
  windSpeed: number;
  windGust: number;
  humidity: number;
  pressure: number;
  cloudiness: number;
  lowClouds: number;
  mediumClouds: number;
  highClouds: number;
  dewpointTemperature: number;
  symbol: string;
  time?: string;
}

interface WeatherPageProps {
  location: { city: string; country: string };
}

const WeatherPage: React.FC<WeatherPageProps> = ({ location }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // You should use the location data to form your API URL if necessary
  const apiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/classic?lat=59.93&lon=10.72&altitude=90`; // Example URL, you should adjust as per actual API

  useEffect(() => {
    axios
      .get(apiUrl, { headers: { "User-Agent": "YourAppName/1.0" } })
      .then((response) => {
        const parser = new xml2js.Parser();
        parser.parseString(response.data, (err: any, result: any) => {
          if (err) {
            setError("Error parsing XML data.");
            setLoading(false);
            return;
          }

          try {
            const weather = result.weatherdata.product[0].time[0].location[0];
            const parsedData: WeatherData = {
              temperature: parseFloat(weather.temperature[0].$.value),
              windDirection: weather.windDirection[0].$.name,
              windSpeed: parseFloat(weather.windSpeed[0].$.mps),
              windGust: parseFloat(weather.windGust[0].$.mps),
              humidity: parseFloat(weather.humidity[0].$.value),
              pressure: parseFloat(weather.pressure[0].$.value),
              cloudiness: parseFloat(weather.cloudiness[0].$.percent),
              lowClouds: parseFloat(weather.lowClouds[0].$.percent),
              mediumClouds: parseFloat(weather.mediumClouds[0].$.percent),
              highClouds: parseFloat(weather.highClouds[0].$.percent),
              dewpointTemperature: parseFloat(
                weather.dewpointTemperature[0].$.value
              ),
              symbol:
                result.weatherdata.product[0].time[1].location[0].symbol[0].$
                  .code,
            };

            setWeatherData(parsedData);

            const dailyForecast = result.weatherdata.product[0].time
              .slice(1, 7)
              .map((timeData: any) => {
                const location = timeData.location[0];
                return {
                  time: timeData.$.from,
                  temperature: parseFloat(location.temperature[0].$.value),
                  windDirection: location.windDirection[0].$.name,
                  windSpeed: parseFloat(location.windSpeed[0].$.mps),
                  windGust: parseFloat(location.windGust[0].$.mps),
                  humidity: parseFloat(location.humidity[0].$.value),
                  pressure: parseFloat(location.pressure[0].$.value),
                  cloudiness: parseFloat(location.cloudiness[0].$.percent),
                  lowClouds: parseFloat(location.lowClouds[0].$.percent),
                  mediumClouds: parseFloat(location.mediumClouds[0].$.percent),
                  highClouds: parseFloat(location.highClouds[0].$.percent),
                  dewpointTemperature: parseFloat(
                    location.dewpointTemperature[0].$.value
                  ),
                  symbol: location.symbol[0].$.code,
                };
              });

            setForecastData(dailyForecast);
          } catch (parseError) {
            setError("Error parsing weather data.");
          }
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error(
          "Error fetching weather data:",
          error.response?.data || error.message
        );
        setError("An error occurred while fetching weather data.");
        setLoading(false);
      });
  }, [apiUrl]);

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
          <p>Temperatur: {weatherData.temperature.toFixed(1)} °C</p>
          <p>Vindretning: {weatherData.windDirection}</p>
          <p>Vindhastighet: {weatherData.windSpeed.toFixed(1)} m/s</p>
          <p>Vindkast: {weatherData.windGust.toFixed(1)} m/s</p>
          <p>Fuktighet: {weatherData.humidity.toFixed(1)}%</p>
          <p>Lufttrykk: {weatherData.pressure.toFixed(1)} hPa</p>
          <p>Skydekke: {weatherData.cloudiness.toFixed(1)}%</p>
          <p>Lave skyer: {weatherData.lowClouds.toFixed(1)}%</p>
          <p>Middels skyer: {weatherData.mediumClouds.toFixed(1)}%</p>
          <p>Høye skyer: {weatherData.highClouds.toFixed(1)}%</p>
          <p>Duggpunkt: {weatherData.dewpointTemperature.toFixed(1)} °C</p>
          <img
            src={`https://api.met.no/images/weathericons/svg/${weatherData.symbol}.svg`}
            alt="Weather symbol"
            title="Weather symbol"
            className="ml-6 scale-150"
          />
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
      <Heading>Værmelding for de neste seks dagene</Heading>
      <div className="flex flex-col items-center">
        {forecastData.map((forecast, index) => (
          <div key={index} className="mb-2 text-left">
            <p>Dato: {new Date(forecast.time || "").toLocaleDateString()}</p>
            <p>Temperatur: {forecast.temperature.toFixed(1)} °C</p>
            <p>Vindretning: {forecast.windDirection}</p>
            <p>Vindhastighet: {forecast.windSpeed.toFixed(1)} m/s</p>
            <p>Vindkast: {forecast.windGust.toFixed(1)} m/s</p>
            <p>Fuktighet: {forecast.humidity.toFixed(1)}%</p>
            <p>Lufttrykk: {forecast.pressure.toFixed(1)} hPa</p>
            <p>Skydekke: {forecast.cloudiness.toFixed(1)}%</p>
            <p>Lave skyer: {forecast.lowClouds.toFixed(1)}%</p>
            <p>Middels skyer: {forecast.mediumClouds.toFixed(1)}%</p>
            <p>Høye skyer: {forecast.highClouds.toFixed(1)}%</p>
            <p>Duggpunkt: {forecast.dewpointTemperature.toFixed(1)} °C</p>
            <img
              src={`https://api.met.no/images/weathericons/svg/${forecast.symbol}.svg`}
              alt="Weather symbol"
              title="Weather symbol"
              className="ml-6 scale-150"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherPage;
