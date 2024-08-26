"use client";

import { useState, useCallback } from "react";
import axios from "axios";

interface Location {
  city: string;
  country: string;
}

interface UseBrowserGeolocationResult {
  location: Location | null;
  error: string | null;
  getLocation: () => void;
}

const useBrowserGeolocation = (): UseBrowserGeolocationResult => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        convertLatLongToCityCountry(latitude, longitude)
          .then((loc) => {
            setLocation(loc);
            setError(null);
          })
          .catch(() => {
            setError("Error converting coordinates to location");
          });
      },
      (err) => {
        setError(`Error fetching precise location: ${err.message}`);
      }
    );
  }, []);

  return {
    location,
    error,
    getLocation,
  };
};

const convertLatLongToCityCountry = async (
  latitude: number,
  longitude: number
): Promise<Location> => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
    );

    if (response.data.results && response.data.results.length > 0) {
      const components = response.data.results[0].components;
      const city = components.city || components.town || components.village;
      const country = components.country;

      if (city && country) {
        return { city, country };
      } else {
        throw new Error("City or country not found");
      }
    } else {
      throw new Error("No results from geocoding API");
    }
  } catch (error) {
    throw new Error("Error converting coordinates to location");
  }
};

export default useBrowserGeolocation;
