"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const useGeolocation = () => {
  const [location, setLocation] = useState<{
    city: string;
    country: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          "https://ipinfo.io/json?token=YOUR_API_TOKEN"
        ); // Replace with your IP geolocation service
        const { city, country } = response.data;
        setLocation({ city, country });
      } catch (err) {
        setError("Error fetching location");
      }
    };

    fetchLocation();
  }, []);

  return { location, error };
};
export default useGeolocation;
