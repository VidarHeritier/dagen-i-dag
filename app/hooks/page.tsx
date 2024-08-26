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
    axios
      .get("/ipinfo/json")
      .then((response) => {
        const { city, country } = response.data;
        setLocation({ city, country });
      })
      .catch(() => {
        setError("Error fetching IP-based location");
      });
  }, []);

  return { location, error };
};

export default useGeolocation;
