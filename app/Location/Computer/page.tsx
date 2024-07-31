import { useState } from "react";

const useBrowserGeolocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError("Error getting location");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return { location, error, getLocation };
};
export default useBrowserGeolocation;
