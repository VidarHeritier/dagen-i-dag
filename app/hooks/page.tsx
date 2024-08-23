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
    axios
      .get("/ipinfo/json")
      .then((response) => {
        const { city, country } = response.data;
        setLocation({ city, country });
      })
      .catch((error) => {
        setError("Error fetching IP-based location");
      });
  }, []);

  return { location, error };
};

export default useGeolocation;
