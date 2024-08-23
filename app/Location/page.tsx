"use client";

import React, { useEffect, useState } from "react";
import useGeolocation from "./IP/page";
import useBrowserGeolocation from "./Computer/page";
import ManualLocationEntry from "./Manual/page";

interface LocationProps {
  onLocationFetched: (location: { city: string; country: string }) => void;
}

const LocationComponent: React.FC<LocationProps> = ({ onLocationFetched }) => {
  const { location: ipLocation, error: ipError } = useGeolocation();
  const {
    location: preciseLocation,
    error: geoError,
    getLocation,
  } = useBrowserGeolocation();
  const [userLocation, setUserLocation] = useState<{
    city: string;
    country: string;
  } | null>(null);

  useEffect(() => {
    if (ipLocation) {
      setUserLocation(ipLocation);
      onLocationFetched(ipLocation);
    }
  }, [ipLocation, onLocationFetched]);

  useEffect(() => {
    if (preciseLocation) {
      setUserLocation(preciseLocation);
      onLocationFetched(preciseLocation);
    }
  }, [preciseLocation, onLocationFetched]);

  const handleManualSubmit = (location: { city: string; country: string }) => {
    setUserLocation(location);
    onLocationFetched(location);
  };

  return (
    <div className="flex justify-center ml-32">
      {userLocation ? (
        <div>
          <p className="mb-4">
            Location: {userLocation.city}, {userLocation.country}
          </p>
        </div>
      ) : (
        <div>
          {ipError && <p>Error fetching IP-based location: {ipError}</p>}
          {geoError && <p>{geoError}</p>}
          <button onClick={getLocation}>Get precise location</button>
          <ManualLocationEntry onSubmit={handleManualSubmit} />
        </div>
      )}
    </div>
  );
};

export default LocationComponent;
