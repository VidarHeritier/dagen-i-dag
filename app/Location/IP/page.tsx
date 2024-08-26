"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Location {
  city: string;
  country: string;
}

interface UseGeolocationResult {
  location: Location | null;
  error: string | null;
}

const useGeolocation = (): UseGeolocationResult => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          "https://ipinfo.io/json?token=YOUR_API_TOKEN"
        );
        const { city, country } = response.data;
        setLocation({ city, country });
        setError(null);
      } catch (err) {
        setError("Error fetching location");
      }
    };

    fetchLocation();
  }, []);

  return { location, error };
};

export default useGeolocation;
